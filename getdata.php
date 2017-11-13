<?php

$period = new DatePeriod(
    new DateTime('2017-01-01'),
    new DateInterval('P7D'),
    new DateTime('2017-09-30')
);


foreach( $period as $date) { $array[] = $date->format('Y-m-d'); }


$data = [
    'halfDonut' => [
        'center' => [ 'label' => 'daily average', 'val' => 587 ],
        'sections' => [
            [ 'label' => 'one', 'val' => 587 ],
            [ 'label' => 'two', 'val' => 305 ]
        ]
    ],

    'donut' => [
        'center' => [ 'label' => 'total', 'val' => 5110 ],
        'sections' => [
            [ 'label' => 'one', 'val' => 15 ],
            [ 'label' => 'two', 'val' => 32 ],
            [ 'label' => 'three', 'val' => 3 ],
            [ 'label' => 'four', 'val' => 30 ],
            [ 'label' => 'five', 'val' => 10 ],
            [ 'label' => 'six', 'val' => 20 ]
        ]
    ],

    'barchart' => [
        [ 'label' => 'one', 'val' => 20 ],
        [ 'label' => 'two', 'val' => 25 ],
        [ 'label' => 'three', 'val' => 10 ],
        [ 'label' => 'four', 'val' => 38 ],
        [ 'label' => 'five', 'val' => 15 ],
        [ 'label' => 'six', 'val' => 90 ]
    ],

    'radar' => [
        'labels' => [ 'Rich', 'Safe', 'Friendly', 'Improving', 'Attractive', 'Community'  ],
        'data' => [
            [ 'name' => 'Site1', 'vals' => [ 1, 2, 3, 2, 3, 2 ] ],
            [ 'name' => 'Site2', 'vals' => [ 4, 3, 2, 3, 3, 1 ] ],
            [ 'name' => 'Site3', 'vals' => [ 2, 1, 2, 2, 1, 2 ] ],
            [ 'name' => 'Site4', 'vals' => [ 4, 1, 1, 3, 2, 1 ] ]
        ]
    ],

    'plot' => [
        'dates' => $array,
        'lines' => [
            [ 13, 15, 10, 11, 16, 18, 12, 15, 17, 18, 20, 30, 12, 28, 20, 22, 19, 24, 30, 23, 23, 20, 24, 21, 22, 30, 20, 18, 15, 14, 22, 24, 26, 25, 20, 15, 11 ],
            [ 21, 10, 5,  13, 9,  17, 15, 20, 10, 12, 12, 11, 23, 26, 20, 17, 18, 19, 25, 20, 21, 20, 15, 16, 12, 23, 21, 20, 25, 15, 17, 20, 21, 20, 21, 18, 20 ]
        ]
    ]
];


echo json_encode( $data );