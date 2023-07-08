'use client';

import { useMemo } from "react";
import ReactDOM from 'react-dom';

type PortalProps = {
  portalRoot: null | HTMLElement;
  scrollingDisabled?: boolean;
  children: React.ReactNode;
};

const Portal: React.FC<PortalProps> = (props) => {
  const { portalRoot, children } = props;
  const container = useMemo<HTMLElement | undefined>(() => {
    if (window.document) {
      const modalContainer = window.document.createElement('div');
      if (portalRoot && modalContainer) {
        modalContainer.className =
          'fixed z-50';
        portalRoot.appendChild(modalContainer);
        return modalContainer;
      }
    }
  }, [portalRoot]);

  return container ? ReactDOM.createPortal(children, container) : null;
};

export default Portal;