"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../helper/helper");
const runner_1 = require("../transition/runner");
function Widget(config) {
    let element = document.createElement(config.tag);
    let parent;
    let DOMPosition;
    let getSiblingsCallback;
    let isMounted = false;
    const id = Math.floor(Math.random() * 1000000000).toString();
    const recent = {
        props: {},
        style: {},
        attributes: {}
    };
    function mount({ node, DOMPosition: position, getSiblings, runEntryTransition }) {
        parent = node;
        DOMPosition = position;
        getSiblingsCallback = getSiblings;
        if (getSiblings) {
            const position = getMountedSiblings();
            const position_occupied = node.children[position];
            position_occupied ? node.insertBefore(element, position_occupied) : node.insertAdjacentElement('beforeend', element);
        }
        else {
            const position = DOMPosition;
            const position_occupied = node.children[position];
            position_occupied ? node.insertBefore(element, position_occupied) : node.insertAdjacentElement('beforeend', element);
        }
        mountChildren();
        if (typeof config.transition === 'function' && (runEntryTransition === undefined || runEntryTransition === true)) {
            (0, runner_1.run_entry_transition)(element, config.transition);
        }
        isMounted = true;
        update();
    }
    function mountChildren() {
        if (config.children)
            config.children.forEach((child, i) => {
                child.mount({ node: element, DOMPosition: i, getSiblings: getChildren, runEntryTransition: true });
            });
    }
    function getMountedSiblings() {
        if (!getSiblingsCallback)
            return 0;
        const previous_siblings = getSiblingsCallback(0, DOMPosition);
        const mountedSiblings = [];
        previous_siblings.forEach(sibling => sibling.collectMountedElements(mountedSiblings));
        return mountedSiblings.length;
    }
    function update() {
        const processed_styles = (0, helper_1.processObject)(config.style);
        const processed_props = (0, helper_1.processObject)(config.props);
        const processed_attributes = (0, helper_1.processObject)(config.attributes);
        const new_styles = (0, helper_1.compareObjects)(recent.style, processed_styles);
        const new_props = (0, helper_1.compareObjects)(recent.props, processed_props);
        const new_attributes = (0, helper_1.compareObjects)(recent.attributes, processed_attributes);
        Object.assign(element.style, new_styles);
        Object.assign(element, new_props);
        for (const attribute in new_attributes) {
            element.setAttribute(attribute, new_attributes[attribute]);
        }
        recent.props = processed_props;
        recent.style = processed_styles;
        recent.attributes = processed_attributes;
        if (config.children) {
            config.children.forEach(child => {
                if (!child.isComponent) {
                    child.update();
                }
                else if (child.isComponent && child.allowStatePassThrough) {
                    child.update();
                }
            });
        }
    }
    async function destroy(options) {
        isMounted = false;
        if (typeof config.transition === 'function' && (options?.runExitTransition === undefined || options?.runExitTransition === true)) {
            (0, runner_1.run_exit_transition)(element, config.transition).then(() => {
                element.remove();
                config.children?.forEach(child => child.destroy(options));
            });
            return;
        }
        element.remove();
    }
    function init() {
        const processed_styles = config.style ? (0, helper_1.processObject)(config.style) : {};
        const processed_props = config.props ? (0, helper_1.processObject)(config.props) : {};
        const processed_attributes = config.attributes ? (0, helper_1.processObject)(config.attributes) : {};
        Object.assign(element.style, processed_styles);
        Object.assign(element, processed_props);
        for (const attribute in processed_attributes) {
            element.setAttribute(attribute, processed_attributes[attribute]);
        }
        (0, helper_1.addEvents)(config.events, element);
        recent.props = processed_props;
        recent.style = processed_styles;
        recent.attributes = processed_attributes;
        if (config.ref)
            config.ref.current = element;
    }
    function getChildren(start, end) {
        if (!config.children)
            return [];
        let to_be_returned = [...config.children.slice(start, end)];
        return to_be_returned;
    }
    function checkForFragments(config) {
        let fragment_list = [];
        if (config.children) {
            config.children.forEach((child, i) => {
                if (child.isNormalFragment)
                    fragment_list.push({ fragment: child, at: i });
            });
        }
        fragment_list.forEach(block => {
            if (block.fragment.children)
                config.children?.splice(block.at, 1, block.fragment.children());
        });
        config.children = config.children?.flat();
        const stillContainsFragments = config.children?.some(child => child.isNormalFragment);
        if (stillContainsFragments)
            checkForFragments(config);
    }
    checkForFragments(config);
    init();
    return {
        get id() { return id; },
        get isComponent() { return false; },
        get isMounted() { return isMounted; },
        collectMountedElements: (collected) => {
            if (isMounted)
                collected.push(element);
        },
        allowStatePassThrough: true,
        mount,
        update,
        destroy
    };
}
exports.default = Widget;
//# sourceMappingURL=widget.js.map