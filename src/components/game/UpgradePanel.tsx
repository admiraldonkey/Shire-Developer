import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGameDispatch, useGameState } from "../hooks/UseGame";
import { UpgradeCard } from "./UpgradeCard";
import type { Upgrade } from "../../types/Game.types";
import { getUpgradeChronicleDayAdvance } from "../../utils/chronicleDates";
import { useRestorationStage } from "../hooks/UseRestorationStage";
import { getRestorationStage } from "../../utils/getRestorationStage";

const UPGRADE_FILTERS = ["all", "passive", "click"] as const;

type UpgradeFilter = (typeof UPGRADE_FILTERS)[number];
type FocusRegion = "deck" | "filters" | "none";
type UpgradePanelProps = {
  onUpgradePurchased: (cost: number) => void;
};

export function UpgradePanel({ onUpgradePurchased }: UpgradePanelProps) {
  const { hobbits, upgrades, restorationPoints, stageMilestonesSeen } =
    useGameState();
  const dispatch = useGameDispatch();
  const restorationStage = useRestorationStage();

  const [selectedFilter, setSelectedFilter] = useState<UpgradeFilter>("all");
  const [selectedUpgradeId, setSelectedUpgradeId] = useState<number | null>(
    upgrades[0]?.id ?? null,
  );
  const [focusedRegion, setFocusedRegion] = useState<FocusRegion>("deck");

  type DeckNotice = {
    id: number;
    type: "success" | "warning" | "milestone";
    message: string;
  };

  type RecentPurchase = {
    id: number;
    upgradeId: number;
    count: number;
  };

  const [deckNotice, setDeckNotice] = useState<DeckNotice | null>(null);
  const [recentPurchase, setRecentPurchase] = useState<RecentPurchase | null>(
    null,
  );

  type MobileSpendFeedback = {
    id: number;
    amount: number;
  };

  const [mobileSpendFeedback, setMobileSpendFeedback] =
    useState<MobileSpendFeedback | null>(null);

  const desktopCardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const mobileCardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);

  const panelRef = useRef<HTMLElement | null>(null);

  const filterButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const feedbackIdRef = useRef(0);

  const recentPurchaseTimeoutRef = useRef<number | null>(null);

  const visibleUpgrades = useMemo(() => {
    if (selectedFilter === "all") {
      return upgrades;
    }

    return upgrades.filter((upgrade) => upgrade.category === selectedFilter);
  }, [selectedFilter, upgrades]);

  const selectedUpgradeStillVisible = visibleUpgrades.some(
    (upgrade) => upgrade.id === selectedUpgradeId,
  );

  const activeUpgradeId =
    selectedUpgradeStillVisible && selectedUpgradeId !== null
      ? selectedUpgradeId
      : (visibleUpgrades[0]?.id ?? null);

  const activeUpgrade =
    visibleUpgrades.find((upgrade) => upgrade.id === activeUpgradeId) ?? null;

  const visuallyActiveUpgradeId =
    focusedRegion === "deck" ? activeUpgradeId : null;

  function focusUpgradeDeck() {
    setFocusedRegion("deck");

    window.requestAnimationFrame(() => {
      panelRef.current?.focus({ preventScroll: true });
    });
  }

  function getFilterLabel(filter: UpgradeFilter) {
    if (filter === "all") return "All";
    if (filter === "passive") return "Passive";
    return "Click";
  }

  function focusSelectedFilter() {
    setFocusedRegion("filters");

    const selectedFilterIndex = UPGRADE_FILTERS.findIndex(
      (filter) => filter === selectedFilter,
    );

    if (selectedFilterIndex === -1) return;

    window.requestAnimationFrame(() => {
      filterButtonRefs.current[selectedFilterIndex]?.focus();
    });
  }

  function handleFilterChange(filter: UpgradeFilter, shouldFocusDeck = false) {
    setFocusedRegion(shouldFocusDeck ? "deck" : "filters");
    setSelectedFilter(filter);

    const nextVisibleUpgrades =
      filter === "all"
        ? upgrades
        : upgrades.filter((upgrade) => upgrade.category === filter);

    const firstVisibleUpgradeId = nextVisibleUpgrades[0]?.id ?? null;

    setSelectedUpgradeId(firstVisibleUpgradeId);

    if (firstVisibleUpgradeId !== null) {
      window.requestAnimationFrame(() => {
        scrollToUpgrade(firstVisibleUpgradeId, "auto");

        if (shouldFocusDeck) {
          panelRef.current?.focus();
        }
      });
    } else if (shouldFocusDeck) {
      focusUpgradeDeck();
    }
  }

  function handleFilterKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      event.stopPropagation();

      const direction = event.key === "ArrowRight" ? 1 : -1;

      const nextIndex =
        (index + direction + UPGRADE_FILTERS.length) % UPGRADE_FILTERS.length;

      const nextFilter = UPGRADE_FILTERS[nextIndex];

      handleFilterChange(nextFilter, false);

      window.requestAnimationFrame(() => {
        filterButtonRefs.current[nextIndex]?.focus();
      });

      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      event.stopPropagation();

      if (activeUpgradeId !== null) {
        scrollToUpgrade(activeUpgradeId);
      }

      focusUpgradeDeck();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  const scrollToUpgrade = useCallback(
    (upgradeId: number, behavior: ScrollBehavior = "smooth") => {
      const possibleNodes = [
        mobileCardRefs.current.get(upgradeId),
        desktopCardRefs.current.get(upgradeId),
      ];

      const visibleNode = possibleNodes.find(
        (node) => node && node.offsetParent !== null,
      );

      visibleNode?.scrollIntoView({
        behavior,
        block: "center",
        inline: "center",
      });
    },
    [],
  );

  useEffect(() => {
    const carouselElement = mobileCarouselRef.current;

    if (!carouselElement || visibleUpgrades.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!(mostVisibleEntry?.target instanceof HTMLElement)) {
          return;
        }

        const upgradeId = Number(mostVisibleEntry.target.dataset.upgradeId);

        if (!Number.isFinite(upgradeId)) {
          return;
        }

        setFocusedRegion("deck");

        setSelectedUpgradeId((currentId) =>
          currentId === upgradeId ? currentId : upgradeId,
        );
      },
      {
        root: carouselElement,
        threshold: [0.5, 0.6, 0.7, 0.8],
        rootMargin: "0px -20% 0px -20%",
      },
    );

    visibleUpgrades.forEach((upgrade) => {
      const cardElement = mobileCardRefs.current.get(upgrade.id);

      if (cardElement) {
        observer.observe(cardElement);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [visibleUpgrades]);

  function setDesktopCardRef(upgradeId: number) {
    return (node: HTMLDivElement | null) => {
      if (node) {
        desktopCardRefs.current.set(upgradeId, node);
      } else {
        desktopCardRefs.current.delete(upgradeId);
      }
    };
  }

  function setMobileCardRef(upgradeId: number) {
    return (node: HTMLDivElement | null) => {
      if (node) {
        mobileCardRefs.current.set(upgradeId, node);
      } else {
        mobileCardRefs.current.delete(upgradeId);
      }
    };
  }

  function getNextFeedbackId() {
    feedbackIdRef.current += 1;
    return feedbackIdRef.current;
  }

  function showDeckNotice(type: DeckNotice["type"], message: string) {
    const notice: DeckNotice = {
      id: getNextFeedbackId(),
      type,
      message,
    };

    setDeckNotice(notice);

    window.setTimeout(() => {
      setDeckNotice((current) => (current?.id === notice.id ? null : current));
    }, 1600);
  }

  function showRecentPurchase(upgradeId: number) {
    const purchaseId = getNextFeedbackId();

    setRecentPurchase((current) => {
      const isSameUpgrade = current?.upgradeId === upgradeId;

      return {
        id: purchaseId,
        upgradeId,
        count: isSameUpgrade ? current.count + 1 : 1,
      };
    });

    if (recentPurchaseTimeoutRef.current !== null) {
      window.clearTimeout(recentPurchaseTimeoutRef.current);
    }

    recentPurchaseTimeoutRef.current = window.setTimeout(() => {
      setRecentPurchase(null);
      recentPurchaseTimeoutRef.current = null;
    }, 1200);
  }
  function showMobileSpendFeedback(amount: number) {
    const feedback: MobileSpendFeedback = {
      id: getNextFeedbackId(),
      amount,
    };

    setMobileSpendFeedback(feedback);

    window.setTimeout(() => {
      setMobileSpendFeedback((current) =>
        current?.id === feedback.id ? null : current,
      );
    }, 1200);
  }

  function selectUpgrade(upgradeId: number) {
    setFocusedRegion("deck");
    setSelectedUpgradeId(upgradeId);
    scrollToUpgrade(upgradeId);
  }

  function handleBuyUpgrade(upgrade: Upgrade) {
    selectUpgrade(upgrade.id);

    const cost = Math.ceil(upgrade.costNext);

    if (hobbits < cost) {
      const missingHobbits = Math.ceil(cost - hobbits);

      showDeckNotice(
        "warning",
        `${missingHobbits.toLocaleString()} more hobbits needed`,
      );

      return;
    }

    const currentStage = getRestorationStage(restorationPoints);
    const nextRestorationPoints = restorationPoints + cost;
    const nextStage = getRestorationStage(nextRestorationPoints);

    dispatch({ type: "BUY_UPGRADE", payload: upgrade.id });

    dispatch({
      type: "ADD_CHRONICLE_ENTRY",
      payload: {
        type: "purchase",
        message: `${upgrade.name} added to the restoration effort`,
        dayAdvance: getUpgradeChronicleDayAdvance(upgrade),
      },
    });

    if (
      nextStage.id !== currentStage.id &&
      !stageMilestonesSeen.includes(nextStage.id)
    ) {
      dispatch({
        type: "ADD_CHRONICLE_ENTRY",
        payload: {
          type: "milestone",
          message: nextStage.milestoneMessage ?? nextStage.mainDescription,
          dayAdvance: 1,
        },
      });

      dispatch({
        type: "MARK_RESTORATION_STAGE_SEEN",
        payload: nextStage.id,
      });

      showDeckNotice("milestone", `${nextStage.name} reached!`);
    } else {
      showDeckNotice("success", "Upgrade purchased!");
    }

    onUpgradePurchased(cost);
    showMobileSpendFeedback(cost);
    showRecentPurchase(upgrade.id);
  }

  function handleKeyboardNavigation(event: React.KeyboardEvent<HTMLElement>) {
    if (visibleUpgrades.length === 0 || activeUpgradeId === null) {
      return;
    }

    const target = event.target as HTMLElement;

    const isInteractiveElement = [
      "BUTTON",
      "A",
      "INPUT",
      "SELECT",
      "TEXTAREA",
    ].includes(target.tagName);

    if (isInteractiveElement) {
      return;
    }

    const currentIndex = visibleUpgrades.findIndex(
      (upgrade) => upgrade.id === activeUpgradeId,
    );

    if (currentIndex === -1) {
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();

      const nextIndex = Math.min(currentIndex + 1, visibleUpgrades.length - 1);
      selectUpgrade(visibleUpgrades[nextIndex].id);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (currentIndex === 0) {
        focusSelectedFilter();
        return;
      }

      const previousIndex = currentIndex - 1;
      selectUpgrade(visibleUpgrades[previousIndex].id);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();

      const previousIndex = Math.max(currentIndex - 1, 0);
      selectUpgrade(visibleUpgrades[previousIndex].id);
      return;
    }

    if (event.key === "Enter") {
      if (!activeUpgrade) {
        return;
      }

      event.preventDefault();

      if (hobbits >= activeUpgrade.costNext) {
        handleBuyUpgrade(activeUpgrade);
      }
    }
  }

  return (
    <section
      ref={panelRef}
      tabIndex={0}
      onKeyDown={handleKeyboardNavigation}
      onFocus={(event) => {
        if (event.target === event.currentTarget) {
          setFocusedRegion("deck");
        }
      }}
      onBlurCapture={(event) => {
        const nextFocusedElement = event.relatedTarget as Node | null;

        if (
          !nextFocusedElement ||
          !event.currentTarget.contains(nextFocusedElement)
        ) {
          setFocusedRegion("none");
        }
      }}
      aria-label="Upgrade deck"
      className={[
        "relative flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border px-4 pb-4 pt-14 shadow-2xl outline-none backdrop-blur transition-colors duration-700 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-amber-200/20 md:p-4",
        restorationStage.theme.panelBackground,
        restorationStage.theme.border,
      ].join(" ")}
    >
      <div
        aria-live="polite"
        className="pointer-events-none absolute left-1/2 top-4 z-50 w-[calc(100%-2rem)] -translate-x-1/2"
      >
        {deckNotice && (
          <div
            key={deckNotice.id}
            className={[
              "mx-auto max-w-sm rounded-full border px-4 py-2 text-center text-sm font-semibold shadow-lg animate-[notice-pop_1600ms_ease-out_forwards]",
              deckNotice.type === "success"
                ? "border-green-300/40 bg-green-950/90 text-green-100"
                : deckNotice.type === "warning"
                  ? "border-amber-300/40 bg-amber-950/90 text-amber-100"
                  : "border-yellow-200/60 bg-yellow-950/95 text-yellow-50 shadow-yellow-900/30",
            ].join(" ")}
          >
            {deckNotice.message}
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute left-4 top-3 z-40 md:hidden">
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-200/45">
          Hobbits
        </p>

        <div className="relative">
          <p className="text-sm font-bold text-amber-100">
            {Math.floor(hobbits).toLocaleString()}
          </p>

          {mobileSpendFeedback && (
            <span className="absolute left-full top-0 ml-2 animate-[float-spend_1200ms_ease-out_forwards] text-sm font-black text-red-300">
              -{mobileSpendFeedback.amount.toLocaleString()}
            </span>
          )}
        </div>
      </div>
      <div className="shrink-0">
        <div>
          <div>
            <h2 className="text-base font-semibold text-amber-100 md:text-lg">
              Rebuild the Shire
            </h2>

            <p className="mt-1 hidden text-sm text-amber-100/60 md:block">
              Invest in comfort, community, and second breakfast logistics.
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-amber-200/20 bg-black/20 px-3 py-1 text-[10px] font-semibold text-amber-100/70">
            {restorationStage.name}
          </span>
        </div>
        <div
          className="mt-3 flex gap-2 md:mt-4"
          role="tablist"
          aria-label="Upgrade filters"
        >
          {UPGRADE_FILTERS.map((filter, index) => {
            const isSelectedFilter = selectedFilter === filter;
            const isFocusedFilter =
              focusedRegion === "filters" && selectedFilter === filter;

            return (
              <button
                key={filter}
                ref={(node) => {
                  filterButtonRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                aria-selected={isSelectedFilter}
                onFocus={() => setFocusedRegion("filters")}
                onClick={() => handleFilterChange(filter, false)}
                onKeyDown={(event) => handleFilterKeyDown(event, index)}
                className={[
                  "rounded-full px-3 py-1.5 text-sm font-semibold transition focus-visible:outline-none",
                  isSelectedFilter
                    ? "bg-amber-200 text-stone-950 cursor-default"
                    : "bg-stone-800 text-amber-100/75 hover:bg-stone-700 cursor-pointer",
                  isFocusedFilter
                    ? "ring-2 ring-amber-300 ring-offset-2 ring-offset-stone-950 cursor-pointer"
                    : "",
                ].join(" ")}
              >
                {getFilterLabel(filter)}
              </button>
            );
          })}
        </div>

        <p className="mt-3 hidden text-xs text-amber-100/45 md:block">
          Use arrow keys to browse. Press Enter to buy the selected upgrade.
        </p>
      </div>

      <div className="mt-4 min-h-0 flex-1 overflow-hidden">
        {/* Desktop stacked deck */}
        <div className="hidden h-full overflow-y-scroll overflow-x-hidden pr-3 scrollbar-gutter:stable md:block">
          <div className="-space-y-5 pb-8">
            {visibleUpgrades.map((upgrade) => (
              <div
                key={upgrade.id}
                ref={setDesktopCardRef(upgrade.id)}
                data-upgrade-id={upgrade.id}
              >
                <UpgradeCard
                  upgrade={upgrade}
                  isSelected={upgrade.id === visuallyActiveUpgradeId}
                  isAffordable={hobbits >= upgrade.costNext}
                  isRecentlyPurchased={recentPurchase?.upgradeId === upgrade.id}
                  recentPurchaseCount={
                    recentPurchase?.upgradeId === upgrade.id
                      ? recentPurchase.count
                      : 0
                  }
                  onSelect={() => selectUpgrade(upgrade.id)}
                  onBuy={() => handleBuyUpgrade(upgrade)}
                  variant="landscape"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="flex min-h-0 flex-1 flex-col md:hidden">
          <div className="min-h-0 flex-1 overflow-hidden">
            <div
              ref={mobileCarouselRef}
              className="flex h-full snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden px-8 py-2"
            >
              <div className="w-[4vw] shrink-0" aria-hidden="true" />

              {visibleUpgrades.map((upgrade) => (
                <div
                  key={upgrade.id}
                  ref={setMobileCardRef(upgrade.id)}
                  data-upgrade-id={upgrade.id}
                  className="flex h-full w-[72vw] max-w-xs shrink-0 snap-center items-stretch py-1"
                >
                  <UpgradeCard
                    upgrade={upgrade}
                    isSelected={upgrade.id === visuallyActiveUpgradeId}
                    isAffordable={hobbits >= upgrade.costNext}
                    isRecentlyPurchased={
                      recentPurchase?.upgradeId === upgrade.id
                    }
                    recentPurchaseCount={
                      recentPurchase?.upgradeId === upgrade.id
                        ? recentPurchase.count
                        : 0
                    }
                    onSelect={() => selectUpgrade(upgrade.id)}
                    onBuy={() => handleBuyUpgrade(upgrade)}
                    variant="portrait"
                  />
                </div>
              ))}

              <div className="w-[4vw] shrink-0" aria-hidden="true" />
            </div>
          </div>

          <div className="shrink-0 pb-1 pt-2">
            <div className="flex justify-center gap-2">
              {visibleUpgrades.map((upgrade) => (
                <button
                  key={upgrade.id}
                  type="button"
                  onClick={() => selectUpgrade(upgrade.id)}
                  aria-label={`Select ${upgrade.name}`}
                  className={[
                    "h-2 rounded-full transition-all",
                    upgrade.id === activeUpgradeId
                      ? "cursor-default w-6 bg-amber-200"
                      : "cursor-pointer w-2 bg-amber-200/30 hover:bg-amber-200/50",
                  ].join(" ")}
                />
              ))}
            </div>

            <p className="mt-2 text-center text-xs text-amber-100/45">
              Swipe to browse upgrades
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
