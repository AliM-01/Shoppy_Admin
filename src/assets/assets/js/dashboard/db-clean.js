(function($) {

    'use strict';

    // ------------------------------------------------------- //
    // Noty
    // ------------------------------------------------------ //

    document.addEventListener("DOMContentLoaded", init, false);

    function init() {
        
        // ------------------------------------------------------- //
        // Delivered Orders
        // ------------------------------------------------------ //
        var randomScalingFactor = function() {
            return (Math.random() > 0.5 ? 1.0 : 1.0) * Math.round(Math.random() * 100);
        };

        Chart.helpers.drawRoundedTopRectangle = function(ctx, x, y, width, height, radius) {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height);
            ctx.lineTo(x, y + height);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
        };

        Chart.elements.RoundedTopRectangle = Chart.elements.Rectangle.extend({
            draw: function() {
                var ctx = this._chart.ctx;
                var vm = this._view;
                var left, right, top, bottom, signX, signY, borderSkipped;
                var borderWidth = vm.borderWidth;

                if (!vm.horizontal) {
                    left = vm.x - vm.width / 2;
                    right = vm.x + vm.width / 2;
                    top = vm.y;
                    bottom = vm.base;
                    signX = 1;
                    signY = bottom > top ? 1 : -1;
                    borderSkipped = vm.borderSkipped || 'bottom';
                } else {
                    left = vm.base;
                    right = vm.x;
                    top = vm.y - vm.height / 2;
                    bottom = vm.y + vm.height / 2;
                    signX = right > left ? 1 : -1;
                    signY = 1;
                    borderSkipped = vm.borderSkipped || 'left';
                }

                if (borderWidth) {
                    var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
                    borderWidth = borderWidth > barSize ? barSize : borderWidth;
                    var halfStroke = borderWidth / 2;
                    var borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
                    var borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
                    var borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
                    var borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
                    if (borderLeft !== borderRight) {
                        top = borderTop;
                        bottom = borderBottom;
                    }
                    if (borderTop !== borderBottom) {
                        left = borderLeft;
                        right = borderRight;
                    }
                }

                var barWidth = Math.abs(left - right);
                var roundness = this._chart.config.options.barRoundness || 0.2;
                var radius = barWidth * roundness * 0.2;

                var prevTop = top;

                top = prevTop + radius;
                var barRadius = top - prevTop;

                ctx.beginPath();
                ctx.fillStyle = vm.backgroundColor;
                ctx.strokeStyle = vm.borderColor;
                ctx.lineWidth = borderWidth;

                Chart.helpers.drawRoundedTopRectangle(ctx, left, (top - barRadius + 1), barWidth, bottom - prevTop, barRadius);

                ctx.fill();
                if (borderWidth) {
                    ctx.stroke();
                }

                top = prevTop;
            },
        });

        Chart.defaults.roundedBar = Chart.helpers.clone(Chart.defaults.bar);

        Chart.controllers.roundedBar = Chart.controllers.bar.extend({
            dataElementType: Chart.elements.RoundedTopRectangle
        });

        var ctx = document.getElementById("orders").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'roundedBar',
            data: {
                labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
                datasets: [{
                    label: 'تحویل داده شده',
                    data: [30, 24, 22, 17, 22, 24, 9, 14, 20, 13, 17, 13],
                    borderColor: "#fff",
                    backgroundColor: "#de1759",
                    hoverBackgroundColor: "#de1759"
                }, {
                    label: 'برآورد شده',
                    data: [10, 14, 12, 20, 20, 8, 10, 20, 7, 11, 8, 10],
                    borderColor: "#fff",
                    backgroundColor: "#5d5386",
                    hoverBackgroundColor: "#5d5386"
                }]
            },
            options: {
                responsive: true,
                barRoundness: 1,
                tooltips: {
                    backgroundColor: 'rgba(47, 49, 66, 0.8)',
                    titleFontSize: 13,
                    titleFontFamily: 'IRANSans',
                    titleFontColor: '#fff',
                    caretSize: 0,
                    cornerRadius: 4,
                    xPadding: 5,
                    displayColors: false,
                    yPadding: 5

                },
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        fontColor: "#2e3451",
                        usePointStyle: true,
                        padding: 50,
                        fontSize: 13
                    }
                },
                scales: {
                    xAxes: [{
                        barThickness: 12,
                        stacked: false,
                        gridLines: {
                            drawBorder: false,
                            display: false
                        },
                        ticks: {
                            display: true
                        }
                    }],
                    yAxes: [{
                        stacked: false,
                        gridLines: {
                            drawBorder: false,
                            display: false
                        },
                        ticks: {
                            display: false
                        }
                    }]
                }
            }
        });
    }


})(jQuery);