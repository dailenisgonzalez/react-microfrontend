import {createPortal} from "react-dom";
import {ReactNode} from "react";


interface PortalFeatureProps {
  portalId: string
  children: ReactNode | null
}

export const PortalFeature = ({portalId, children}: PortalFeatureProps) => {
  return createPortal(
    <>
      {children}
    </>
    ,
    document.getElementById(portalId)!
  )
}