$(document).ready(function () {

    let options = $("[id^=trainingOptions]");

    if (options.length) {
        $(function () {

            $("#myform").on("change", "input", function (e) {
                shuffle = $("[id^=shuffle]").is(":checked");
                if (shuffle) {
                    status = "";
                    color = "#212529";
                } else {
                    status = "disabled";
                    color = "gray";
                }
                $("[id^=seed]").prop("disabled", status);
                document.getElementById("seedText").style.color = color;

                learnHeatmaps = $("[id^=learnHeatmaps]").is(":checked");
                if (learnHeatmaps) {
                    status = "";
                    color = "#212529";
                } else {
                    status = "disabled";
                    color = "gray";
                }
                $("[id^=iterations2D]").prop("disabled", status);
                document.getElementById("iterations2DText").style.color = color;
            })

        })
    }
});