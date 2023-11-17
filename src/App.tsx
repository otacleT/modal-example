import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);

  const openModal = useCallback(() => {
    if (dialogRef.current) {
      setTrigger(document.activeElement as HTMLElement);
      dialogRef.current.showModal();
    }
  }, []);

  const closeModal = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
      trigger?.focus();
    }
  }, [trigger]);

  /**
   * フォーカストラップ
   */
  useEffect(() => {
    const dialogEl = dialogRef.current;
    const focusableElements = Array.from<HTMLElement>(
      dialogEl?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) ?? []
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    dialogEl?.addEventListener("keydown", handleKeyDown);
    return () => {
      dialogEl?.removeEventListener("keydown", handleKeyDown);
    };
  }, [dialogRef]);

  /**
   * モーダルの外側をクリックしたときにモーダルを閉じる
   */
  useEffect(() => {
    const dialogEl = dialogRef.current;

    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target === dialogEl && event.target !== dialogEl?.firstChild) {
        closeModal();
      }
    };

    dialogEl?.addEventListener("click", handleBackdropClick);
    return () => {
      dialogEl?.removeEventListener("click", handleBackdropClick);
    };
  }, [closeModal]);

  return (
    <>
      <button onClick={() => openModal()}>Open Modal</button>
      <dialog className="c-dialog" ref={dialogRef}>
        <div className="c-dialog__inner">
          <h2>タイトル</h2>
          <p>このモーダルは、HTMLのdialog要素を使って実装されています。</p>
          <button onClick={() => closeModal()}>Close Modal</button>
          <button
            onClick={() => {
              alert("成功");
              closeModal();
            }}
          >
            アクション
          </button>
        </div>
      </dialog>
    </>
  );
}

export default App;
