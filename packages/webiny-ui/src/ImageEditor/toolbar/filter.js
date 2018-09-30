// @flow
import React from "react";
import { ReactComponent as FilterIcon } from "./icons/filter.svg";
import { Switch } from "webiny-ui/Switch";
import { Slider } from "webiny-ui/Slider";
import type { ImageEditor, ImageEditorTool } from "./types";
import { IconButton } from "webiny-ui/Button";

type State = {
    filters: Object
};

type Props = {
    imageEditor: ImageEditor
};

class SubMenu extends React.Component<Props, State> {
    delayedChange = null;

    state = {
        filters: {
            removeWhite: {
                enabled: false,
                threshold: 0,
                distance: 0
            },
            brightness: {
                enabled: false,
                value: 0
            },
            noise: {
                enabled: false,
                value: 0
            },
            gradientTransparency: {
                enabled: false,
                value: 0
            },
            pixelate: {
                enabled: false,
                value: 2
            }
        }
    };

    toggleFilter = (name: string, options = null) => {
        const { imageEditor } = this.props;

        this.setState(
            state => {
                state.filters[name] = !state.filters[name];
                return state;
            },
            () => {
                this.state.filters[name]
                    ? imageEditor.applyFilter(name, options)
                    : imageEditor.removeFilter(name);
            }
        );
    };

    render() {
        return (
            <ul>
                <li>
                    <table>
                        <tbody>
                            <tr>
                                {["Grayscale", "Invert", "Sepia"].map(name => (
                                    <td key={name}>
                                        <Switch
                                            label={name}
                                            value={this.state.filters[name]}
                                            onChange={() => this.toggleFilter(name)}
                                        />
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>
                                    <Switch
                                        label={"Sepia Light"}
                                        value={this.state.filters.Sepia2}
                                        onChange={() => this.toggleFilter("Sepia2")}
                                    />
                                </td>
                                {["Blur", "Sharpen"].map(name => (
                                    <td key={name}>
                                        <Switch
                                            label={name}
                                            value={this.state.filters[name]}
                                            onChange={() => this.toggleFilter(name)}
                                        />
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>
                                    <Switch
                                        label={"Emboss"}
                                        value={this.state.filters.Emboss}
                                        onChange={() => this.toggleFilter("Emboss")}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </li>
                <li>
                    <Switch
                        label={"Remove white"}
                        value={this.state.filters.removeWhite.enabled}
                        onChange={() => {
                            const { imageEditor } = this.props;
                            this.setState(
                                state => {
                                    state.filters.removeWhite.enabled = !state.filters.removeWhite
                                        .enabled;
                                    return state;
                                },
                                () => {
                                    this.state.filters.removeWhite.enabled
                                        ? imageEditor.applyFilter("removeWhite", {
                                              distance: this.state.filters.removeWhite.distance,
                                              threshold: this.state.filters.removeWhite.threshold
                                          })
                                        : imageEditor.removeFilter("removeWhite");
                                }
                            );
                        }}
                    />

                    <Slider
                        label={"Threshold"}
                        value={this.state.filters.removeWhite.threshold}
                        min={0}
                        max={255}
                        onInput={value => {
                            if (this.delayedChange) {
                                clearTimeout(this.delayedChange);
                            }

                            const { imageEditor } = this.props;

                            this.setState(
                                state => {
                                    state.filters.removeWhite.threshold = value;
                                    return state;
                                },
                                () => {
                                    this.delayedChange = setTimeout(() => {
                                        this.state.filters.removeWhite.enabled &&
                                            imageEditor.applyFilter("removeWhite", {
                                                distance: this.state.filters.removeWhite.distance,
                                                threshold: this.state.filters.removeWhite.threshold
                                            });
                                    }, 200);
                                }
                            );
                        }}
                    />

                    <Slider
                        label={"Distance"}
                        value={this.state.filters.removeWhite.distance}
                        min={0}
                        max={255}
                        onInput={value => {
                            if (this.delayedChange) {
                                clearTimeout(this.delayedChange);
                            }

                            const { imageEditor } = this.props;
                            this.setState(
                                state => {
                                    state.filters.removeWhite.distance = value;
                                    return state;
                                },
                                () => {
                                    this.delayedChange = setTimeout(() => {
                                        this.state.filters.removeWhite.enabled &&
                                            imageEditor.applyFilter("removeWhite", {
                                                distance: this.state.filters.removeWhite.distance,
                                                threshold: this.state.filters.removeWhite.threshold
                                            });
                                    }, 200);
                                }
                            );
                        }}
                    />
                </li>
                <li>
                    <Switch
                        label={"Brightness"}
                        value={this.state.filters.brightness.enabled}
                        onChange={() => {
                            const { imageEditor } = this.props;
                            this.setState(
                                state => {
                                    state.filters.brightness.enabled = !state.filters.brightness
                                        .enabled;
                                    return state;
                                },
                                () => {
                                    this.state.filters.brightness.enabled
                                        ? imageEditor.applyFilter("brightness", {
                                              brightness: this.state.filters.brightness.value
                                          })
                                        : imageEditor.removeFilter("brightness");
                                }
                            );
                        }}
                    />

                    <Slider
                        label={"Value"}
                        value={this.state.filters.brightness.value}
                        min={-255}
                        max={255}
                        onInput={value => {
                            if (this.delayedChange) {
                                clearTimeout(this.delayedChange);
                            }

                            const { imageEditor } = this.props;

                            this.setState(
                                state => {
                                    state.filters.brightness.value = value;
                                    return state;
                                },
                                () => {
                                    this.delayedChange = setTimeout(() => {
                                        this.state.filters.brightness.enabled &&
                                            imageEditor.applyFilter("brightness", {
                                                brightness: this.state.filters.brightness.value
                                            });
                                    }, 200);
                                }
                            );
                        }}
                    />
                </li>
                <li>
                    <Switch
                        label={"Noise"}
                        value={this.state.filters.noise.enabled}
                        onChange={() => {
                            const { imageEditor } = this.props;
                            this.setState(
                                state => {
                                    state.filters.noise.enabled = !state.filters.noise.enabled;
                                    return state;
                                },
                                () => {
                                    this.state.filters.noise.enabled
                                        ? imageEditor.applyFilter("noise", {
                                              noise: this.state.filters.noise.value
                                          })
                                        : imageEditor.removeFilter("noise");
                                }
                            );
                        }}
                    />

                    <Slider
                        label={"Value"}
                        value={this.state.filters.noise.value}
                        min={0}
                        max={1000}
                        onInput={value => {
                            if (this.delayedChange) {
                                clearTimeout(this.delayedChange);
                            }

                            const { imageEditor } = this.props;

                            this.setState(
                                state => {
                                    state.filters.noise.value = value;
                                    return state;
                                },
                                () => {
                                    this.delayedChange = setTimeout(() => {
                                        this.state.filters.noise.enabled &&
                                            imageEditor.applyFilter("noise", {
                                                noise: this.state.filters.noise.value
                                            });
                                    }, 200);
                                }
                            );
                        }}
                    />
                </li>
                <li>
                    <Switch
                        label={"GradientTransparency"}
                        value={this.state.filters.gradientTransparency.enabled}
                        onChange={() => {
                            const { imageEditor } = this.props;
                            this.setState(
                                state => {
                                    state.filters.gradientTransparency.enabled = !state.filters
                                        .gradientTransparency.enabled;
                                    return state;
                                },
                                () => {
                                    this.state.filters.gradientTransparency.enabled
                                        ? imageEditor.applyFilter("gradientTransparency", {
                                              threshold: this.state.filters.gradientTransparency
                                                  .value
                                          })
                                        : imageEditor.removeFilter("gradientTransparency");
                                }
                            );
                        }}
                    />

                    <Slider
                        label={"Value"}
                        value={this.state.filters.gradientTransparency.value}
                        min={0}
                        max={100}
                        onInput={value => {
                            if (this.delayedChange) {
                                clearTimeout(this.delayedChange);
                            }

                            const { imageEditor } = this.props;

                            this.setState(
                                state => {
                                    state.filters.gradientTransparency.value = value;
                                    return state;
                                },
                                () => {
                                    this.delayedChange = setTimeout(() => {
                                        this.state.filters.gradientTransparency.enabled &&
                                            imageEditor.applyFilter("gradientTransparency", {
                                                threshold: this.state.filters.gradientTransparency
                                                    .value
                                            });
                                    }, 200);
                                }
                            );
                        }}
                    />
                </li>
                <li>
                    <Switch
                        label={"Pixelate"}
                        value={this.state.filters.pixelate.enabled}
                        onChange={() => {
                            const { imageEditor } = this.props;
                            this.setState(
                                state => {
                                    state.filters.pixelate.enabled = !state.filters.pixelate
                                        .enabled;
                                    return state;
                                },
                                () => {
                                    this.state.filters.pixelate.enabled
                                        ? imageEditor.applyFilter("pixelate", {
                                              blocksize: this.state.filters.pixelate.value
                                          })
                                        : imageEditor.removeFilter("pixelate");
                                }
                            );
                        }}
                    />

                    <Slider
                        label={"Value"}
                        value={this.state.filters.pixelate.value}
                        min={2}
                        max={20}
                        onInput={value => {
                            value = parseInt(value);

                            if (this.delayedChange) {
                                clearTimeout(this.delayedChange);
                            }

                            const { imageEditor } = this.props;

                            this.setState(
                                state => {
                                    state.filters.pixelate.value = value;
                                    return state;
                                },
                                () => {
                                    this.delayedChange = setTimeout(() => {
                                        this.state.filters.pixelate.enabled &&
                                            imageEditor.applyFilter("pixelate", {
                                                blocksize: this.state.filters.pixelate.value
                                            });
                                    }, 200);
                                }
                            );
                        }}
                    />
                </li>

                <li onClick={this.props.clearTool}>Close</li>
            </ul>
        );
    }
}

const tool: ImageEditorTool = {
    name: "filter",
    icon({ imageEditor, enableTool }) {
        return (
            <IconButton
                icon={<FilterIcon />}
                onClick={() => {
                    enableTool();
                    imageEditor.startDrawingMode();
                }}
            />
        );
    },
    subMenu(props) {
        return <SubMenu {...props} />;
    }
};

export default tool;