<script>
    "use-strict"

    import {
        cssClasses,
        dataAttributes,
        events,
        selectors,
        MDCDataTableFoundation
    } from "@material/data-table";
    import { closest } from "@material/dom/ponyfill";
    import MDCIconButton from "./../mdc-icon-button";
    import MDCSelect from "./../mdc-select";

    export default {
        name: "mdc-data-table",

        components: {
            "mdc-icon-button": MDCIconButton,
            "mdc-select": MDCSelect
        },

        props: {
            items: {
                default() {
                    return [];
                },
                type: Array
            },
            itemsPerPage: {
                default() {
                    return 10;
                },
                type: Number
            },
            headers: Array,
            totalItems: Number
        },

        computed: {
            isNextPageAvailable() {
                return (this.paginationLeading - 1) + this.itemsPerPage_ < this.paginationTotal;
            },

            isPreviousPageAvailable() {
                return this.paginationLeading - 1 !== 0;
            },

            paginationLeading() {
                return this.page * this.itemsPerPage_ + 1;
            },

            paginationTrailing() {
                let paginationTrailing = (this.paginationLeading - 1) + this.visibileItems.length;

                if(paginationTrailing < this.paginationLeading) {
                    paginationTrailing = this.paginationLeading;
                }

                return paginationTrailing;
            },

            paginationTotal() {
                return this.totalItems || this.items.length;
            }
        },

        data() {
            return {
                itemsPerPage_: this.itemsPerPage,
                mdcFoundation: null,
                page: 0,
                visibileItems: []
            };
        },

        mounted() {
            this.init();
        },

        beforeDestroy() {
            this.deinit();
        },

        watch: {
            items() {
                this.getVisbileItems();
                this.$forceUpdate();
            },

            itemsPerPage_() {
                this.page = 0;
                this.getVisbileItems();
            },

            page(newValue, oldValue) {
                this.getVisbileItems();
                this.onPagination();

                // Incrementing forward
                if(newValue > oldValue) {
                    this.needsToBeFed();
                }
            }
        },

        render(c) {
            return c(
                "div",
                {
                    staticClass: "mdc-data-table"
                },
                [
                    c(
                        "div",
                        {
                            staticClass: "mdc-data-table__table-container"
                        },
                        [
                            c(
                                "table",
                                {
                                    staticClass: "mdc-data-table__table"
                                },
                                [
                                    this.genTableHead(c),
                                    this.genTableBody(c)
                                ]
                            )
                        ]
                    ),
                    this.genPagination(c)
                ]
            );
        },

        methods: {
            init() {
                this.mdcFoundation = new MDCDataTableFoundation(this);

                this.getVisbileItems();
            },

            deinit() {
                this.mdcFoundation.destroy();
            },

            getVisbileItems() {
                let start = this.page * this.itemsPerPage_,
                    end = start + this.itemsPerPage_;

                this.visibileItems = this.items.slice(start, end);

                return this.visibileItems;
            },

            nextPage() {
                this.page++;
            },

            previousPage() {
                this.page--;
            },

            onPagination() {
                this.$emit("pagination", {
                    page: this.page + 1,
                    itemsPerPage: this.itemsPerPage_,
                    itemAtPageStart: this.items[this.page * this.itemsPerPage_],
                    itemAtPageEnd: this.items[this.page * this.itemsPerPage + this.itemsPerPage_ - 1]
                });
            },

            onHungry(finalItem) {
                this.$emit("hungry", {
                    finalItem,
                    itemsPerPage: this.itemsPerPage_
                });
            },

            needsToBeFed() {
                // Currently only supports checking while incrementing forward
                let pageStart = this.page * this.itemsPerPage_,
                    pageEnd = pageStart + this.itemsPerPage_,
                    feedToIndex = pageEnd + this.itemsPerPage_,
                    feedCheckLimitIndex = feedToIndex > this.paginationTotal ? this.paginationTotal : feedToIndex;

                for(let i = pageStart; i < feedCheckLimitIndex; i++) {
                    if(!this.items[i]) {
                        this.onHungry(this.items[i - 1]);
                        break;
                    }
                }
            },

            genTableHead(c) {
                if(this.headers.length) {
                    return c(
                        "thead",
                        {},
                        [
                            c(
                                "tr",
                                {
                                    staticClass: "mdc-data-table__header-row"
                                },
                                this.genTableHeaders(c)
                            )
                        ]
                    );
                }
            },

            genTableHeaders(c) {
                let tableHeaders = [];

                tableHeaders = this.headers
                .map(header => {
                    return c(
                        "th",
                        {
                            attrs: {
                                role: "columnheader",
                                scope: "col"
                            },
                            staticClass: "mdc-data-table__header-cell"
                        },
                        header.text
                    );
                });

                return tableHeaders;
            },

            genTableBody(c) {
                return c(
                    "tbody",
                    {
                        staticClass: "mdc-data-table__content"
                    },
                    this.genTableRows(c)
                );
            },

            genTableRows(c) {
                let tableRows = [];

                tableRows = this.visibileItems
                .map((item) => {
                    return c(
                        "tr",
                        {
                            staticClass: "mdc-data-table__row"
                        },
                        (() => {
                            let cells = [];

                            for(let x = 0; x < this.headers.length; x++) {
                                if(this.$scopedSlots["item." + this.headers[x].value]) {
                                    cells.push(
                                        c(
                                            "td",
                                            {
                                                staticClass: "mdc-data-table__cell"
                                            },
                                            this.$scopedSlots["item." + this.headers[x].value]({
                                                item
                                            })
                                        )
                                    );
                                }
                                else {
                                    cells.push(
                                        c(
                                            "td",
                                            {
                                                staticClass: "mdc-data-table__cell"
                                            },
                                            item[this.headers[x].value]
                                        )
                                    );
                                }
                            }

                            return cells;
                        })()
                    );
                });

                return tableRows;
            },

            genPagination(c) {
                const _this = this;

                return c(
                    "div",
                    {
                        staticClass: "mdc-data-table__pagination"
                    },
                    [
                        c(
                            "div",
                            {
                                staticClass: "mdc-data-table__pagination-trailing"
                            },
                            [
                                c(
                                    "div",
                                    {
                                        staticClass: "mdc-data-table__pagination-rows-per-page"
                                    },
                                    [
                                        c(
                                            "div",
                                            {
                                                staticClass: "mdc-data-table__pagination-rows-per-page-label"
                                            },
                                            "Rows per page"
                                        )
                                    ]
                                ),
                                c(
                                    "mdc-select",
                                    {
                                        props: {
                                            outlined: true,
                                            menuItems: [
                                                {
                                                    text: "10"
                                                },
                                                {
                                                    text: "25"
                                                },
                                                {
                                                    text: "50"
                                                }
                                            ],
                                            value: this.itemsPerPage_
                                        },
                                        on: {
                                            input(value) {
                                                _this.itemsPerPage_ = parseInt(value);
                                            }
                                        },
                                        staticClass: "mdc-select--no-label mdc-data-table__pagination-rows-per-page-select"
                                    }
                                ),
                                c(
                                    "div",
                                    {
                                        staticClass: "mdc-data-table__pagination-navigation"
                                    },
                                    [
                                        c(
                                            "div",
                                            {
                                                staticClass: "mdc-data-table__pagination-total"
                                            },
                                            `${ this.paginationLeading }-${ this.paginationTrailing } of ${ this.paginationTotal }`
                                        ),
                                        c(
                                            "mdc-icon-button",
                                            {
                                                attrs: {
                                                    "data-prev-page": "true"
                                                },
                                                props: {
                                                    disabled: !this.isPreviousPageAvailable
                                                },
                                                staticClass: "mdc-data-table__pagination-button",
                                                nativeOn: {
                                                    click() {
                                                        _this.previousPage();
                                                    }
                                                }
                                            },
                                            "chevron_left"
                                        ),
                                        c(
                                            "mdc-icon-button",
                                            {
                                                attrs: {
                                                    "data-prev-page": "true"
                                                },
                                                props: {
                                                    disabled: !this.isNextPageAvailable
                                                },
                                                staticClass: "mdc-data-table__pagination-button",
                                                nativeOn: {
                                                    click() {
                                                        _this.nextPage();
                                                    }
                                                }
                                            },
                                            "chevron_right"
                                        )
                                    ]
                                )
                            ]
                        )
                    ]
                );
            },

            // Adapter methods
            addClass(className) {
                this.$el.classList.add(className);
            },

            removeClass(className) {
                this.$el.classList.remove(className);
            },

            getHeaderCellElements() {
                return Array.from(this.$el.querySelectorAll(selectors.HEADER_CELL));
            },

            getHeaderCellCount() {
                return this.getHeaderCellElements().length;
            },

            getAttributeByHeaderCellIndex(index, attribute) {
                return this.getHeaderCellElements()[index].getAttribute(attribute);
            },

            setAttributeByHeaderCellIndex(index, attribute, value) {
                this.getHeaderCellElements()[index].setAttribute(attribute, value);
            },

            setClassNameByHeaderCellIndex(index, className) {
                this.getHeaderCellElements()[index].classList.add(className);
            },

            removeClassNameByHeaderCellIndex(index, className) {
                this.getHeaderCellElements()[index].classList.remove(className);
            },

            notifySortAction(data) {
                this.$emit(events.SORTED, data);
            },

            getTableContainerHeight() {
                let tableContainer = this.$el.querySelector(`.${cssClasses.TABLE_CONTAINER}`);

                if (!tableContainer) {
                    throw new Error("MDCDataTable: Table container element not found.");
                }

                return tableContainer.getBoundingClientRect().height;
            },

            getTableHeaderHeight() {
                let tableHeader = this.$el.querySelector(selectors.HEADER_ROW);

                if (!tableHeader) {
                    throw new Error("MDCDataTable: Table header element not found.");
                }

                return tableHeader.getBoundingClientRect().height;
            },

            // TODO: Implement
            setProgressIndicatorStyles() {},

            addClassAtRowIndex(rowIndex, className) {
                this.getRowElements()[rowIndex].classList.add(className);
            },

            getRowCount() {
                return this.getRowElements().length;
            },

            getRowElements() {
                return Array.from(this.$el.querySelectorAll(selectors.ROW));
            },

            getRowIdAtIndex(rowIndex) {
                return this.getRowElements()[rowIndex].getAttribute(dataAttributes.ROW_ID);
            },

            getRowIndexByChildElements(el) {
                return this.getRowElements().indexOf(closest(el, selectors.ROW));
            },

            getSelectedRowCount() {
                return this.$el.querySelectorAll(selectors.ROW_SELECTED).length;
            },

            // TODO: Implement
            isCheckboxAtRowIndexChecked() {
                return false;
            },

            // TODO: Implement
            isHeaderRowCheckboxChecked() {
                return false;
            },

            // TODO: Implement
            isRowsSelectable() {
                return false;
            },

            notifyRowSelectionChanged(data) {
                this.$emit(events.ROW_SELECTION_CHANGED, {
                    row: this.getRowByIndex(data.rowIndex),
                    rowId: this.getRowIdByIndex(data.rowIndex),
                    rowIndex: data.rowIndex,
                    selected: data.selected,
                });
            },

            notifySelectedAll() {
                this.$emit(events.SELECTED_ALL);
            },
            
            notifyUnselectedAll() {
                this.$emit(events.UNSELECTED_ALL);
            },

            // TODO: Implement
            registerHeaderRowCheckbox() {},

            // TODO: Implement
            registerRowCheckboxes() {},

            removeClassAtRowIndex(rowIndex, className) {
                this.getRowElements()[rowIndex].classList.remove(className);
            },

            setAttributeAtRowIndex(rowIndex, attr, value) {
                this.getRowElements()[rowIndex].setAttribute(attr, value);
            },

            // TODO: Implement
            setHeaderRowCheckboxChecked() {},

            // TODO: Implement
            setHeaderRowCheckboxIndeterminate() {},

            // TODO: Implement
            setRowCheckboxCheckedAtIndex() {},

            // TODO: Implement
            setSortStatusLabelByHeaderCellIndex() {}
        }
    }
</script>

<style lang="scss">
    @use "@material/data-table/mdc-data-table";
</style>