// @flowIgnore
import React from "react";
import invariant from "invariant";
import compose from "webiny-compose";
import { app } from "webiny-app";
import { WidgetContainer } from "webiny-app-cms";

/**
 * Default logic for single widget rendering.
 */
const defaultWidgetRender = ({ widget }) => {
    const cms = app.services.get("cms");

    const widgetDefinition = cms.getWidget(widget.type);
    invariant(widgetDefinition, `Missing widget definition for type "${widget.type}"`);

    const widgetElement = widgetDefinition.widget.render({ WidgetContainer, widget });
    return React.cloneElement(widgetElement, { widget });
};

/**
 * Default middleware for rendering of page widgets.
 * It will not render anything if there already is an output assigned by previous middleware.
 */
const defaultWidgetRenderMiddleware = (params: Object, next: Function) => {
    if (params.output) {
        return next();
    }
    params.output = defaultWidgetRender(params);
    next();
};

/**
 * Page renderer factory
 * @param config
 * @returns {Function}
 */
export const createRenderer = (config: Object) => {
    const widgetRender = config.widget || [];
    const widgetRenderMiddleware = compose([...widgetRender, defaultWidgetRenderMiddleware]);

    return async (data: Object) => {
        const content = [];
        for (let i = 0; i < data.content.length; i++) {
            const widgetParams = {
                page: data,
                widget: data.content[i],
                output: null,
                defaultWidgetRender
            };
            await widgetRenderMiddleware(widgetParams);
            const { output } = widgetParams;
            // $FlowFixMe
            content.push(React.cloneElement(output, { key: data.content[i].id }));
        }

        return config.page ? config.page(content) : <section>{content}</section>;
    };
};
