import { useEffect, useState} from "react";
import {PortalFeature} from "../PortalFeature";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

interface ComponentBridgeProps {
  // TODO: define type for components
  components: Record<string, any | null>
}

interface DataPortalElement extends Element {
  dataset?: {
    portalId?: string
    componentId: string
  }
}


const ComponentBridge = ({components}: ComponentBridgeProps) => {
  const [elements, setElements] = useState<Element[]>([])
  const updateElementsPool = () => {
    setElements(prevElements => {
      const elements = Array.from(document.querySelectorAll('[data-portal-id]'))
      const elementsIds = elements.map(element => element.id)
      const prevElementsIds = prevElements.map(element => element.id)
      const elementsChanged = elementsIds.join() === prevElementsIds.join()
      return elementsChanged ? prevElements : elements
    })
  }
  useEffect(updateElementsPool, [])

  useEffect(() => {
    if (MutationObserver) {
      // define a new observer
      const mutationObserver = new MutationObserver(() => {
        updateElementsPool()
      })

      // have the observer observe for changes in children
      mutationObserver.observe(document.body, {childList: true, subtree: true})
      return () => mutationObserver.disconnect()
    }
  }, [])

  return (
    <>
      {elements.map((el: DataPortalElement) => {
        console.log('trying to mount component', el.dataset!.componentId)
        if(!components[el.dataset!.componentId]) return null
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const Component = components[el.dataset!.componentId]
        return (
          <PortalFeature portalId={el.id} key={el.id}>
            <Component/>
          </PortalFeature>
        )
      })}
    </>
  )
}

export default ComponentBridge