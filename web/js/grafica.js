/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(function () {

    $(document).ready(function () {

        // Build the chart
        Highcharts.chart('container', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Roles de Usuarios Registrados'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                    name: 'Usuarios',
                    colorByPoint: true,
                    data: [{
                            name: 'Administrador',
                            y: 75.0
                        }, {
                            name: 'Cliente',
                            y: 25.0,
                            sliced: true,
                            selected: true
                        }, {
                            name: 'Almacenista',
                            y: 0.0
                        }]
                }]
        });
    });


        Highcharts.chart('container2', {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: 'Total de Categorias Registratas'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                    type: 'pie',
                    name: 'Categorias',
                    data: [
                        ['Accesorios', 87.5],
                        ['Audio', 12.5],
                        {
                            name: 'Laptops',
                            y: 0.0,
                            sliced: true,
                            selected: true
                        }
                    ]
                }]
        });

});