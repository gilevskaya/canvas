(function () {
    var canvas = document.getElementById("webgl-canvas");
    var ctx = canvas.getContext("webgl");
    // @ts-ignore
    var resizeObserver = new ResizeObserver(function (entries) {
        var _a;
        var _b = (_a = entries[0]) === null || _a === void 0 ? void 0 : _a.contentRect, width = _b.width, height = _b.height;
        if (!width || !height)
            return;
        canvas.width = Math.round(width);
        canvas.height = Math.round(height);
    });
    resizeObserver.observe(document.getElementById("container"));
    console.log({ ctx: ctx });
})();
