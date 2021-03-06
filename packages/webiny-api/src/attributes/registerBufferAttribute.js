// @flow
import { EntityAttributesContainer } from "webiny-entity";
import BufferAttribute from "./bufferAttribute";

export default () => {
    /**
     * Buffer attribute
     * @package webiny-api
     * @return {BufferAttribute}
     */
    // $FlowFixMe
    EntityAttributesContainer.prototype.buffer = function(encoding: buffer$NonBufferEncoding) {
        const parent = this.getParentModel();
        parent.setAttribute(this.name, new BufferAttribute(this.name, this, encoding));
        return parent.getAttribute(this.name);
    };
};
