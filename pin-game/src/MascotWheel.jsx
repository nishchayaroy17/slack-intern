import { useEffect, useRef, useState } from "react";
import { Wheel } from "spin-wheel";

function WheelComponent({ setActiveIndex, setWinnerIndex }) {
  const containerRef = useRef(null);
  const wheelRef = useRef(null);

  const [isSpinning, setIsSpinning] = useState(false);
  const [blink, setBlink] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  const blinkIntervalRef = useRef(null);
  const trackIntervalRef = useRef(null);

  const originalItemsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = [
      { label: "One", backgroundColor: "rgb(220,96,104)", textColor: "#fff" },
      { label: "Two", backgroundColor: "rgb(231,233,237)", textColor: "#000" },
      { label: "Three", backgroundColor: "rgb(231,233,237)", textColor: "#000" },
      { label: "Four", backgroundColor: "rgb(220,96,104)", textColor: "#fff" },
    ];

    originalItemsRef.current = JSON.parse(JSON.stringify(items));

    const props = {
      items,
      borderColor: "rgb(68,74,83)",
      borderWidth: 8,
      lineColor: "rgb(68,74,83)",
      lineWidth: 6,
      itemLabelRadius: 0.6,
    };

    wheelRef.current = new Wheel(containerRef.current, props);
    wheelRef.current.pointerAngle = 0;

    return () => {
      wheelRef.current?.remove();
      clearInterval(blinkIntervalRef.current);
      clearInterval(trackIntervalRef.current);
    };
  }, []);

  const resetWheelColors = () => {
    if (!wheelRef.current) return;

    wheelRef.current.items.forEach((item, i) => {
      item.backgroundColor = originalItemsRef.current[i].backgroundColor;
      item.textColor = originalItemsRef.current[i].textColor;
    });

    wheelRef.current.draw();
  };

  const spinWheel = () => {
    if (!wheelRef.current || isSpinning || hasSpun) return;

    setIsSpinning(true);
    setWinnerIndex(null);

    resetWheelColors();

    const duration = 4000;

    blinkIntervalRef.current = setInterval(() => {
      setBlink((prev) => !prev);
    }, 200);

    let lastIndex = -1;

    trackIntervalRef.current = setInterval(() => {
      if (!wheelRef.current) return;

      const currentIndex = wheelRef.current.getCurrentIndex();

      if (currentIndex !== lastIndex) {
        lastIndex = currentIndex;
        setActiveIndex(currentIndex);
      }
    }, 80);

    // Make sure we do not get the same exact number consecutively
    let winningItemIndex;
    const lastWinner = sessionStorage.getItem("lastWheelWinner");
    // eslint-disable-next-line react-hooks/purity
    do {
      winningItemIndex = Math.floor(
        Math.random() * wheelRef.current.items.length
      );
    } while (String(winningItemIndex) === lastWinner && wheelRef.current.items.length > 1);

    sessionStorage.setItem("lastWheelWinner", winningItemIndex);

    const easing = (t) => 1 - Math.pow(1 - t, 3);

    // spinToCenter = false adds variety so it doesn't always land precisely in the middle
    wheelRef.current.spinToItem(
      winningItemIndex,
      duration,
      false,
      2,
      1,
      easing
    );

    setTimeout(() => {
      clearInterval(blinkIntervalRef.current);
      clearInterval(trackIntervalRef.current);

      if (!wheelRef.current) return;

      setIsSpinning(false);
      setHasSpun(true);

      const currentIndex = wheelRef.current.getCurrentIndex();

      setActiveIndex(currentIndex);
      setWinnerIndex(currentIndex);

      highlightWinner(currentIndex);
    }, duration);
  };

  const highlightWinner = (index) => {
    if (!wheelRef.current) return;

    wheelRef.current.items.forEach((item, i) => {
      if (i === index) {
        item.backgroundColor = "rgb(68,74,83)";
        item.textColor = "#fff";
      }
    });

    wheelRef.current.draw();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          position: "relative",
          width: 500,
          height: 500,
          margin: "20px auto",
        }}
      >
        {/* Wheel */}
        <div
          ref={containerRef}
          style={{ width: "100%", height: "100%" }}
        />

        {/* Center Button */}
        <div
          onClick={spinWheel}
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: isSpinning
              ? (blink ? "#ff4d4d" : "#8b0000")
              : "#fff",
            color: isSpinning ? "#fff" : "#000",
            border: "8px solid rgb(68,74,83)",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            cursor: hasSpun ? "not-allowed" : "pointer",
            pointerEvents: hasSpun ? "none" : "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 16,
            transition: "all 0.2s ease",
          }}
        >
          {isSpinning || hasSpun ? "" : "SPIN"}
        </div>

        {/* Pointer */}
        <div
          style={{
            position: "absolute",
            top: -10,
            left: "50%",
            transform: "translateX(-50%)",
            borderLeft: "24px solid transparent",
            borderRight: "24px solid transparent",
            borderTop: "48px solid rgb(68,74,83)",
            zIndex: 20,
          }}
        />
      </div>
    </div>
  );
}

export default WheelComponent;