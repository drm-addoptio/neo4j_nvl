import { NVL } from '@neo4j-nvl/base';
import { ZoomInteraction, PanInteraction } from '@neo4j-nvl/interaction-handlers';

// Expose NVL components to the global window object for Webflow
window.NVL = NVL;
window.ZoomInteraction = ZoomInteraction;
window.PanInteraction = PanInteraction;
