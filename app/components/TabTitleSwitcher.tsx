"use client";

import { useEffect, useRef } from "react";

const MESSAGES = ["Sigue navegando! 👀", "Tenemos justo lo que necesitas"];
const START_DELAY_MS = 4000;
const SWITCH_INTERVAL_MS = 8500;

/**
 * Cambia el título de la pestaña cuando el usuario sale de la página
 * (cambia de pestaña o minimiza la ventana), esperando 4 segundos antes
 * de empezar a alternar entre los mensajes de MESSAGES para invitarlo a
 * volver. Al regresar, restaura el título original de la página.
 */
export function TabTitleSwitcher() {
  const originalTitleRef = useRef<string>("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    originalTitleRef.current = document.title;

    function clearTimers() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    function handleVisibilityChange() {
      clearTimers();

      if (document.hidden) {
        timeoutRef.current = setTimeout(() => {
          let index = 0;
          document.title = MESSAGES[index];

          intervalRef.current = setInterval(() => {
            index = (index + 1) % MESSAGES.length;
            document.title = MESSAGES[index];
          }, SWITCH_INTERVAL_MS);
        }, START_DELAY_MS);
      } else {
        document.title = originalTitleRef.current;
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimers();
      document.title = originalTitleRef.current;
    };
  }, []);

  return null;
}