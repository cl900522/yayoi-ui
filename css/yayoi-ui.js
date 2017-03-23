import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "*": {
        "border": "0px solid transparent",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "fontFamily": "微软雅黑",
        "borderSpacing": 0,
        "textOverflow": "ellipsis",
        "textDecoration": "none"
    },
    "yayoi-icon": {
        "display": "inline-block",
        "textAlign": "center",
        "textDecoration": "inherit",
        "speak": "none"
    },
    "yayoi-checkbox": {
        "display": "inline-block",
        "height": 30,
        "width": "auto",
        "marginTop": 0,
        "marginRight": 5,
        "marginBottom": 0,
        "marginLeft": 5,
        "fontSize": 12,
        "fontWeight": "bold",
        "lineHeight": 20,
        "color": "#333",
        "whiteSpace": "nowrap",
        "verticalAlign": "middle",
        "cursor": "pointer",
        "backgroundColor": "#eee",
        "backgroundImage": "linear-gradient(#fcfcfc, #eee)",
        "border": "1px solid #d5d5d5",
        "borderRadius": 3
    },
    "yayoi-checkbox-icon": {
        "float": "left",
        "height": 30,
        "width": 20,
        "display": "inline-block",
        "lineHeight": 30,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 5
    },
    "yayoi-checkbox-text": {
        "float": "left",
        "height": 30,
        "width": "auto",
        "display": "inline-block",
        "lineHeight": 30,
        "marginTop": 0,
        "marginRight": 5,
        "marginBottom": 0,
        "marginLeft": 5
    },
    "yayoi-date-picker": {
        "width": 220,
        "height": "auto",
        "position": "absolute",
        "zIndex": 50,
        "backgroundColor": "#fff",
        "border": "1px solid #ccc"
    },
    "yayoi-date-picker head": {
        "height": 40,
        "width": "100%",
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": 5,
        "marginLeft": "auto"
    },
    "yayoi-date-picker head icon-left-box": {
        "height": 40,
        "lineHeight": 40,
        "float": "left",
        "width": 20,
        "marginLeft": 20,
        "display": "inline-block"
    },
    "yayoi-date-picker head title-box": {
        "height": 40,
        "lineHeight": 40,
        "width": 140,
        "display": "inline-block",
        "textAlign": "center",
        "fontSize": 12
    },
    "yayoi-date-picker head icon-right-box": {
        "height": 40,
        "lineHeight": 40,
        "float": "right",
        "width": 20,
        "marginRight": 20,
        "display": "inline-block",
        "textAlign": "right"
    },
    "datepicker-body": {
        "paddingTop": 0,
        "paddingRight": 5,
        "paddingBottom": 10,
        "paddingLeft": 5,
        "width": "100%"
    },
    "datepicker-body tbody tdcurrent": {
        "color": "black"
    },
    "date-picker-days thead": {
        "width": "auto",
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": "auto",
        "marginLeft": "auto",
        "fontSize": 10,
        "color": "gray",
        "display": "block"
    },
    "date-picker-days tbody": {
        "width": "auto",
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": "auto",
        "marginLeft": "auto",
        "fontSize": 10,
        "color": "gray",
        "display": "block"
    },
    "date-picker-days tr": {
        "width": "auto",
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": "auto",
        "marginLeft": "auto",
        "fontSize": 10,
        "color": "gray",
        "display": "block"
    },
    "date-picker-days td": {
        "width": 28,
        "textAlign": "center",
        "border": "1px solid transparent"
    },
    "date-picker-days thead td": {
        "fontWeight": "bold",
        "color": "black"
    },
    "date-picker-days tbody td:hover": {
        "border": "1px solid #1E90FF",
        "cursor": "pointer"
    },
    "date-picker-months tbody": {
        "width": "auto",
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": "auto",
        "marginLeft": "auto",
        "fontSize": 10,
        "color": "gray",
        "display": "block"
    },
    "date-picker-months tr": {
        "width": "auto",
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": "auto",
        "marginLeft": "auto",
        "fontSize": 10,
        "color": "gray",
        "display": "block"
    },
    "date-picker-months td": {
        "width": 50,
        "textAlign": "center",
        "border": "1px solid transparent",
        "paddingBottom": 5
    },
    "date-picker-months td:hover": {
        "border": "1px solid #1E90FF"
    },
    "date-picker-years tbody": {
        "width": "auto",
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": "auto",
        "marginLeft": "auto",
        "fontSize": 10,
        "color": "gray",
        "display": "block"
    },
    "date-picker-years tr": {
        "width": "auto",
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": "auto",
        "marginLeft": "auto",
        "fontSize": 10,
        "color": "gray",
        "display": "block"
    },
    "date-picker-years td": {
        "width": 50,
        "textAlign": "center",
        "border": "1px solid transparent",
        "paddingBottom": 5
    },
    "date-picker-years td:hover": {
        "border": "1px solid #1E90FF"
    },
    "yayoi-pager": {
        "height": 20
    },
    "yayoi-pager yayoi-pager-icon": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginTop": 0,
        "marginRight": 2,
        "marginBottom": 0,
        "marginLeft": 2,
        "display": "inline-block",
        "float": "left",
        "cursor": "pointer",
        "height": 20,
        "lineHeight": 20,
        "border": "1px solid transparent"
    },
    "yayoi-pager yayoi-pager-icon:active": {
        "border": "1px solid #1E90FF"
    },
    "yayoi-pager yayoi-pager-input": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginTop": 0,
        "marginRight": 3,
        "marginBottom": 0,
        "marginLeft": 3,
        "display": "inline-block",
        "float": "left",
        "cursor": "pointer",
        "height": 20,
        "lineHeight": 20,
        "border": "1px solid transparent"
    },
    "yayoi-pager yayoi-pager-input input": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginTop": 1,
        "marginRight": 2,
        "marginBottom": 1,
        "marginLeft": 2,
        "width": 20,
        "height": 16,
        "lineHeight": 16,
        "fontSize": 12,
        "display": "inline-block",
        "textAlign": "center",
        "visibility": "middle",
        "border": "1px solid #1E90FF"
    },
    "yayoi-button": {
        "display": "inline-block",
        "height": 30,
        "width": "auto",
        "marginTop": 0,
        "marginRight": 5,
        "marginBottom": 0,
        "marginLeft": 5,
        "fontSize": 12,
        "fontWeight": "bold",
        "lineHeight": 20,
        "color": "#333",
        "whiteSpace": "nowrap",
        "verticalAlign": "middle",
        "cursor": "pointer",
        "backgroundColor": "#eee",
        "backgroundImage": "linear-gradient(#fcfcfc, #eee)",
        "border": "1px solid #d5d5d5",
        "borderRadius": 3
    },
    "yayoi-button:hover": {
        "color": "#fff",
        "textShadow": "0 -1px 0 rgba(0, 0, 0, 0.15)",
        "backgroundColor": "#60A7FF",
        "backgroundImage": "linear-gradient(#60A7FF, #60A7FF)",
        "borderColor": "#60A7FF"
    },
    "yayoi-button-icon": {
        "float": "left",
        "height": 30,
        "width": 20,
        "display": "inline-block",
        "lineHeight": 30
    },
    "yayoi-button-icon-left": {
        "marginTop": 0,
        "marginRight": -5,
        "marginBottom": 0,
        "marginLeft": 10
    },
    "yayoi-button-icon-right": {
        "marginTop": 0,
        "marginRight": 10,
        "marginBottom": 0,
        "marginLeft": -5
    },
    "yayoi-button-text": {
        "float": "left",
        "height": 30,
        "width": "auto",
        "display": "inline-block",
        "lineHeight": 30,
        "marginTop": 0,
        "marginRight": 10,
        "marginBottom": 0,
        "marginLeft": 10
    },
    "yayoi-container": {
        "display": "block",
        "height": "auto",
        "width": "100%"
    },
    "yayoi-container tbody": {
        "display": "block",
        "height": "auto",
        "width": "100%"
    },
    "yayoi-container tr": {
        "display": "block",
        "width": "100%"
    },
    "yayoi-container yayoi-container-cell": {
        "display": "inline-block",
        "height": "auto",
        "width": "auto",
        "lineHeight": "100%"
    },
    "yayoi-form": {
        "display": "block",
        "width": "100%",
        "height": "100%",
        "backgroundColor": "transparent"
    },
    "yayoi-form-head": {
        "display": "block",
        "width": "100%",
        "height": 37,
        "borderRadius": "3px 3px 0 0",
        "border": "1px solid #d8d8d8",
        "borderBottom": 0,
        "backgroundColor": "#f5f5f5"
    },
    "yayoi-form-head title": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 9,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "fontSize": 14,
        "lineHeight": 17,
        "display": "block",
        "fontWeight": "bold"
    },
    "yayoi-form-body": {
        "width": "100%",
        "height": "auto",
        "minHeight": 100,
        "maxHeight": "calc(100% - 77px)",
        "border": "1px solid #d8d8d8",
        "borderTop": 0,
        "borderBottom": 0,
        "paddingTop": 10,
        "paddingRight": 0,
        "paddingBottom": 10,
        "paddingLeft": 0
    },
    "yayoi-form-body table": {
        "width": "100%"
    },
    "yayoi-form-body tbody": {
        "width": "100%"
    },
    "yayoi-form-body tr": {
        "width": "100%"
    },
    "yayoi-form-row": {
        "width": "100%",
        "maxWidth": "100%",
        "borderBottom": "1px solid #d8d8d8",
        "minHeight": 40
    },
    "yayoi-form-cell": {
        "minHeight": 40,
        "height": "auto",
        "paddingTop": 2,
        "paddingRight": 0,
        "paddingBottom": 2,
        "paddingLeft": 0
    },
    "yayoi-field": {
        "display": "block",
        "width": "100%",
        "minHeight": 40,
        "lineHeight": 40,
        "verticalAlign": "middle"
    },
    "yayoi-field-title": {
        "display": "inline-block",
        "float": "left",
        "width": "30%",
        "maxWidth": "30%",
        "textAlign": "center"
    },
    "yayoi-field-title>span": {
        "fontSize": 12,
        "fontWeight": "bold",
        "paddingTop": 1,
        "paddingRight": 10,
        "paddingBottom": 1,
        "paddingLeft": 10,
        "background": "transparent",
        "color": "#666",
        "display": "inline-block",
        "maxWidth": "100%",
        "height": 30
    },
    "yayoi-field-value": {
        "display": "inline-block",
        "verticalAlign": "middle",
        "float": "left",
        "height": "auto",
        "width": "70%",
        "maxWidth": "70%"
    },
    "yayoi-field-input": {
        "display": "inline-block",
        "width": "calc(100% - 50px)",
        "maxWidth": "calc(100% - 50px)",
        "minHeight": 30,
        "fontSize": 13,
        "lineHeight": 30,
        "paddingTop": 0,
        "paddingRight": 8,
        "paddingBottom": 0,
        "paddingLeft": 8,
        "color": "#333",
        "verticalAlign": "middle",
        "backgroundColor": "#fff",
        "backgroundRepeat": "no-repeat",
        "backgroundPosition": "right 8px center",
        "border": "1px solid #ccc",
        "borderRadius": 3,
        "outline": "none",
        "boxShadow": "inset 0 1px 2px rgba(0, 0, 0, 0.075)"
    },
    "yayoi-field-input:ACTIVE": {
        "borderColor": "#1E90FF"
    },
    "yayoi-field-input:FOCUS": {
        "borderColor": "#1E90FF"
    },
    "yayoi-field-date": {
        "display": "inline-block",
        "width": "calc(100% - 90px)",
        "maxWidth": "calc(100% - 90px)",
        "minHeight": 30,
        "fontSize": 12,
        "lineHeight": 30,
        "paddingTop": 0,
        "paddingRight": 8,
        "paddingBottom": 0,
        "paddingLeft": 8,
        "color": "#333",
        "verticalAlign": "middle",
        "backgroundColor": "#fff",
        "backgroundRepeat": "no-repeat",
        "backgroundPosition": "right 8px center",
        "border": "1px solid #ccc",
        "borderRadius": 3,
        "outline": "none",
        "boxShadow": "inset 0 1px 2px rgba(0, 0, 0, 0.075)"
    },
    "yayoi-field-date:ACTIVE": {
        "borderColor": "#1E90FF"
    },
    "yayoi-field-date:FOCUS": {
        "borderColor": "#1E90FF"
    },
    "yayoi-field-date-icon": {
        "verticalAlign": "middle",
        "display": "inline-block",
        "height": 30,
        "minHeight": 30,
        "fontSize": 13,
        "lineHeight": 30,
        "marginLeft": 10,
        "cursor": "pointer"
    },
    "yayoi-field-textarea": {
        "display": "inline-block",
        "width": "calc(100% - 50px)",
        "maxWidth": "calc(100% - 50px)",
        "minHeight": 100,
        "fontSize": 13,
        "lineHeight": 20,
        "paddingTop": 0,
        "paddingRight": 8,
        "paddingBottom": 0,
        "paddingLeft": 8,
        "marginTop": 5,
        "marginRight": 0,
        "marginBottom": 5,
        "marginLeft": 0,
        "color": "#333",
        "verticalAlign": "middle",
        "backgroundColor": "#fff",
        "backgroundRepeat": "no-repeat",
        "backgroundPosition": "right 8px center",
        "border": "1px solid #ccc",
        "borderRadius": 3,
        "outline": "none",
        "boxShadow": "inset 0 1px 2px rgba(0, 0, 0, 0.075)",
        "resize": "none"
    },
    "yayoi-field-textarea:ACTIVE": {
        "borderColor": "#1E90FF"
    },
    "yayoi-field-textarea:FOCUS": {
        "borderColor": "#1E90FF"
    },
    "yayoi-field-select": {
        "display": "inline-block",
        "width": "calc(100% - 50px)",
        "maxWidth": "calc(100% - 50px)",
        "verticalAlign": "middle",
        "background": "#fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAMAAACzvE1FAAAADFBMVEUzMzMzMzMzMzMzMzMKAG/3AAAAA3RSTlMAf4C/aSLHAAAAPElEQVR42q3NMQ4AIAgEQTn//2cLdRKppSGzBYwzVXvznNWs8C58CiussPJj8h6NwgorrKRdTvuV9v16Afn0AYFOB7aYAAAAAElFTkSuQmCC) no-repeat right 8px center",
        "backgroundSize": "8px 10px",
        "WebkitAppearance": "none",
        "MozAppearance": "none",
        "appearance": "none",
        "paddingTop": 0,
        "paddingRight": 8,
        "paddingBottom": 0,
        "paddingLeft": 8,
        "fontSize": 13,
        "lineHeight": 32,
        "height": 32,
        "border": "1px solid #ccc",
        "borderRadius": 3,
        "boxShadow": "inset 0 1px 2px rgba(0, 0, 0, 0.075)"
    },
    "yayoi-field-select option": {
        "lineHeight": 32,
        "height": 32,
        "display": "block"
    },
    "yayoi-field-select:ACTIVE": {
        "borderColor": "#1E90FF"
    },
    "yayoi-field-select:FOCUS": {
        "borderColor": "#1E90FF"
    },
    "yayoi-field-select-selections": {
        "display": "none",
        "position": "absolute",
        "minWidth": 300,
        "maxHeight": 300,
        "border": "1px #cccccc solid"
    },
    "yayoi-field-select-selections ul": {
        "display": "block",
        "backgroundColor": "white",
        "width": "100%"
    },
    "yayoi-field-select-selections ul>li": {
        "height": 30,
        "lineHeight": 30,
        "fontSize": 13,
        "textIndent": 10,
        "display": "block",
        "width": "100%"
    },
    "yayoi-field-select-selections ul selected": {
        "fontSize": 15,
        "fontWeight": "bold"
    },
    "yayoi-field-select-selections ul>li:HOVER": {
        "color": "white",
        "backgroundColor": "#1E90FF",
        "fontSize": 15
    },
    "yayoi-form-foot": {
        "display": "block",
        "paddingTop": 5,
        "paddingRight": 0,
        "paddingBottom": 5,
        "paddingLeft": 0,
        "width": "100%",
        "height": 30,
        "borderTop": 0,
        "backgroundColor": "#f5f5f5",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "borderRadius": "0 0 3px 3px",
        "border": "1px solid #d8d8d8",
        "fontSize": 14,
        "lineHeight": 17
    },
    "yayoi-form-foot buttons": {
        "display": "block",
        "float": "right",
        "height": "100%",
        "lineHeight": "100%",
        "paddingRight": 20
    },
    "yayoi-ui-tabs": {
        "marginLeft": 4
    },
    "yayoi-ui-tabs yayoi-ui-tabs-nav": {
        "width": "100%",
        "height": 35,
        "overflow": "hidden",
        "marginTop": 3,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "fontSize": 10,
        "borderBottom": 2,
        "borderBottomColor": "#F7F7F7",
        "display": "block",
        "listStyle": "none"
    },
    "yayoi-ui-tabs yayoi-ui-tabs-nav li": {
        "cursor": "pointer",
        "float": "left",
        "width": 140,
        "textIndent": 10,
        "borderTopLeftRadius": 5,
        "borderTopRightRadius": 5,
        "marginRight": 4,
        "listStyle": "none",
        "position": "relative"
    },
    "yayoi-ui-tabs yayoi-ui-tabs-nav liactive": {
        "border": "3px solid #60a7ff",
        "backgroundColor": "#ffffff",
        "borderBottom": 0,
        "height": 31.3
    },
    "yayoi-ui-tabs yayoi-ui-tabs-nav lideactive": {
        "backgroundColor": "#60A7FF",
        "height": 32,
        "marginTop": 2,
        "border": 0
    },
    "yayoi-ui-tabs yayoi-ui-tabs-nav li>span": {
        "lineHeight": 32,
        "fontWeight": "bold"
    },
    "yayoi-ui-tabs yayoi-ui-tabs-nav lideactive>span": {
        "color": "#FCFDFF",
        "fontWeight": "normal"
    },
    "yayoi-ui-tabs yayoi-ui-tabs-nav li closeTab": {
        "textIndent": 0,
        "display": "block",
        "position": "absolute",
        "left": 120,
        "top": 11,
        "width": 10,
        "height": 10,
        "lineHeight": 10,
        "overflow": "hidden"
    },
    "yayoi-ui-tabs yayoi-ui-tabs-nav lideactive closeTab": {
        "color": "#FCFDFF"
    },
    "yayoi-ui-tabs yayoi-ui-tabs-main": {
        "width": "99.4%",
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto",
        "height": "100%",
        "backgroundColor": "#ffffff"
    },
    "yayoi-ui-tabs yayoi-ui-tabs-main active": {
        "width": "100%",
        "height": "100%",
        "border": 0,
        "display": "block",
        "overflow": "hidden"
    },
    "yayoi-ui-tabs yayoi-ui-tabs-main deactive": {
        "width": "100%",
        "height": "100%",
        "border": 0,
        "overflow": "hidden",
        "display": "none"
    },
    "yayoi-ui-tabs yayoi-ui-tabs-main iframe": {
        "width": "100%",
        "height": "100%",
        "border": 0,
        "display": "block",
        "overflow": "hidden"
    },
    "yayoi-mask": {
        "backgroundColor": "transparent",
        "position": "fixed",
        "top": 0,
        "left": 0,
        "zIndex": 99
    },
    "yayoi-dialog": {
        "backgroundColor": "transparent",
        "position": "fixed",
        "top": 0,
        "left": 0,
        "width": 500,
        "height": "auto",
        "zIndex": 100
    },
    "yayoi-dialog-head": {
        "display": "block",
        "width": "100%",
        "height": 37,
        "borderRadius": "3px 3px 0 0",
        "border": "1px solid #d8d8d8",
        "borderBottom": 0,
        "backgroundColor": "#f5f5f5"
    },
    "yayoi-dialog-head title": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 9,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "fontSize": 14,
        "lineHeight": 17,
        "display": "inline-block",
        "fontWeight": "bold",
        "float": "left"
    },
    "yayoi-dialog-head close-icon": {
        "marginTop": 0,
        "marginRight": 10,
        "marginBottom": 0,
        "marginLeft": 10,
        "width": 20,
        "height": 40,
        "lineHeight": 40,
        "display": "inline-block",
        "float": "right",
        "cursor": "pointer"
    },
    "yayoi-dialog-body": {
        "width": "100%",
        "height": "auto",
        "minHeight": 100,
        "maxHeight": "calc(100% - 77px)",
        "border": "1px solid #d8d8d8",
        "borderTop": 0,
        "borderBottom": 0,
        "paddingTop": 10,
        "paddingRight": 0,
        "paddingBottom": 10,
        "paddingLeft": 0,
        "backgroundColor": "white"
    },
    "yayoi-dialog-body content": {
        "paddingTop": 0,
        "paddingRight": 10,
        "paddingBottom": 0,
        "paddingLeft": 10
    },
    "yayoi-dialog-foot": {
        "display": "block",
        "paddingTop": 5,
        "paddingRight": 0,
        "paddingBottom": 5,
        "paddingLeft": 0,
        "width": "100%",
        "height": 30,
        "borderTop": 0,
        "backgroundColor": "#f5f5f5",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "borderRadius": "0 0 3px 3px",
        "border": "1px solid #d8d8d8",
        "fontSize": 14,
        "lineHeight": 17
    },
    "yayoi-dialog-foot buttons": {
        "display": "block",
        "float": "right",
        "height": "100%",
        "lineHeight": "100%",
        "paddingRight": 10
    },
    "yayoi-grid": {
        "backgroundColor": "transparent",
        "position": "fixed",
        "top": 0,
        "left": 0,
        "width": 500,
        "height": "auto",
        "zIndex": 100
    },
    "yayoi-grid-head": {
        "display": "block",
        "width": "100%",
        "height": 37,
        "borderRadius": "3px 3px 0 0",
        "border": "1px solid #d8d8d8",
        "borderBottom": 0,
        "backgroundColor": "#f5f5f5"
    },
    "yayoi-grid-head button": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "width": 20,
        "height": 20,
        "position": "relative",
        "top": -10,
        "right": -10,
        "fontSize": 14,
        "display": "inline-block",
        "float": "right"
    },
    "yayoi-grid-body": {
        "width": "100%",
        "height": "auto",
        "minHeight": 100,
        "maxHeight": "calc(100% - 77px)",
        "border": "1px solid #d8d8d8",
        "borderTop": 0,
        "borderBottom": 0,
        "paddingTop": 5,
        "paddingRight": 0,
        "paddingBottom": 5,
        "paddingLeft": 0,
        "overflow": "hidden"
    },
    "yayoi-grid-body>div": {
        "display": "block",
        "height": "100%",
        "float": "left",
        "width": "auto"
    },
    "yayoi-grid-body yayoi-flex-grid": {
        "overflowX": "scroll"
    },
    "yayoi-grid-table": {
        "width": "auto",
        "display": "block",
        "fontSize": 1
    },
    "yayoi-grid-table tr": {
        "width": "auto",
        "borderBottom": "1px solid #d8d8d8",
        "display": "block",
        "height": 35,
        "lineHeight": 35
    },
    "yayoi-grid-table tr:last-child": {},
    "yayoi-grid-table td": {
        "borderRight": "1px solid #d8d8d8",
        "lineHeight": 35,
        "height": 35,
        "textAlign": "center"
    },
    "yayoi-grid-table td>div": {
        "width": "100%",
        "height": "100%"
    },
    "yayoi-grid-table td>divselected": {
        "backgroundColor": "#eeeeee"
    },
    "yayoi-grid-table td>divsingle-row": {
        "backgroundColor": "#efefef"
    },
    "yayoi-grid-table divrow-column": {
        "width": 30
    },
    "yayoi-grid-table divcheck-column": {
        "width": 40
    },
    "yayoi-grid-table divcheck-column input[type=checkbox]": {
        "cursor": "pointer"
    },
    "yayoi-grid-table operation-icon": {
        "cursor": "pointer",
        "float": "left"
    },
    "yayoi-grid-table operation-icon:hover": {
        "border": "1px solid #cccccc"
    },
    "yayoi-grid-table operation-icon:first-child": {
        "marginLeft": 50
    },
    "yayoi-grid-titles yayoi-grid-table": {
        "fontWeight": "bold"
    },
    "yayoi-grid-foot": {
        "display": "block",
        "paddingTop": 5,
        "paddingRight": 0,
        "paddingBottom": 5,
        "paddingLeft": 0,
        "width": "100%",
        "height": 20,
        "borderTop": 0,
        "backgroundColor": "#f5f5f5",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "borderRadius": "0 0 3px 3px",
        "border": "1px solid #d8d8d8",
        "fontSize": 14,
        "lineHeight": 17
    },
    "yayoi-grid-foot buttons": {
        "display": "block",
        "float": "right",
        "height": "100%",
        "lineHeight": "100%",
        "paddingRight": 10
    },
    "yayoi-menu": {
        "position": "absolute",
        "display": "block",
        "width": 170,
        "height": "auto",
        "backgroundColor": "#D2E0E6",
        "zIndex": 50
    },
    "yayoi-menu>li": {
        "display": "block",
        "height": 40,
        "width": "100%",
        "overflow": "hidden",
        "border": "1px solid #2B81AF"
    },
    "yayoi-menunode": {
        "width": "100%",
        "height": "100%",
        "lineHeight": "100%",
        "cursor": "pointer"
    },
    "yayoi-menunode:hover": {
        "color": "white",
        "backgroundColor": "#2B81AF"
    },
    "yayoi-menunodedisabled": {
        "backgroundColor": "#cccccc",
        "color": "#777777"
    },
    "yayoi-menunode-icon": {
        "display": "inline-block",
        "width": 20,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 10,
        "lineHeight": 40,
        "height": 40,
        "float": "left"
    },
    "yayoi-menunode-text": {
        "display": "inline-block",
        "width": 100,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 10,
        "lineHeight": 40,
        "height": 40,
        "textOverflow": "ellipsis",
        "float": "left",
        "fontSize": 10
    },
    "yayoi-menunode-sub": {
        "display": "inline-block",
        "width": 20,
        "paddingLeft": 10,
        "lineHeight": 40,
        "height": 40,
        "float": "right"
    },
    "yayoi-tree": {},
    "yayoi-treeNodes-container": {
        "borderLeft": "1px black dotted",
        "marginLeft": 10
    },
    "yayoi-treeNode-box": {
        "borderLeft": "10px transparent solid"
    },
    "yayoi-treeNode-self": {
        "height": 25,
        "lineHeight": 25,
        "display": "block",
        "fontSize": 14
    },
    "yayoi-treeNode-expand": {
        "display": "inline-block",
        "height": 25,
        "lineHeight": 25,
        "marginTop": 0,
        "marginRight": 3,
        "marginBottom": 0,
        "marginLeft": 3,
        "cursor": "pointer"
    },
    "yayoi-treeNode-check": {
        "display": "inline-block",
        "height": 25,
        "lineHeight": 25,
        "marginTop": 0,
        "marginRight": 3,
        "marginBottom": 0,
        "marginLeft": 3,
        "cursor": "pointer"
    },
    "yayoi-treeNode-icon": {
        "display": "inline-block",
        "height": 25,
        "marginTop": 0,
        "marginRight": 3,
        "marginBottom": 0,
        "marginLeft": 3,
        "lineHeight": 25,
        "cursor": "pointer"
    },
    "yayoi-treeNode-text": {
        "display": "inline-block",
        "height": 25,
        "lineHeight": 25
    },
    "yayoi-ui-metro-wall": {
        "backgroundColor": "rgb(244, 204, 141)",
        "position": "relative"
    },
    "yayoi-ui-metro-tile": {
        "backgroundColor": "rgb(128, 201, 137)",
        "position": "absolute",
        "cursor": "pointer",
        "zIndex": 5
    }
});