import { NVL } from '@neo4j-nvl/base';
import { 
  ZoomInteraction,
  PanInteraction,
  DragNodeInteraction,
  BoxSelectInteraction,
  ClickInteraction,
  HoverInteraction,
  LassoInteraction
} from '@neo4j-nvl/interaction-handlers';

// Expose NVL components to the global window object for Webflow
window.NVL = NVL;
window.ZoomInteraction = ZoomInteraction;
window.PanInteraction = PanInteraction;
window.DragNodeInteraction = DragNodeInteraction;
window.boxSelectInteraction = BoxSelectInteraction;
window.clickInteraction = ClickInteraction;
window.hoverInteraction = HoverInteraction;
window.lassoInteraction = LassoInteraction;
window.zoomInteraction = ZoomInteraction;
