<?php


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
        'dates' => ['2017-01-01', '2017-01-08', '2017-01-15', '2017-01-22', '2017-01-29', '2017-02-05', '2017-02-12'],
        'lines' => [
            [ 13, 15, 10, 11, 16, 18, 12 ], [ 21, 10, 5, 13, 9, 17, 15 ]
        ]
    ]
];


echo json_encode( $data );