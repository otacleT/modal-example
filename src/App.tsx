import { useCallback, useRef, useState } from "react";
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
