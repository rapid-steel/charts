<?php


$data = [
    'barchart' => [
        [ 'label' => 'one', 'val' => 20 ],
        [ 'label' => 'two', 'val' => 25 ],
        [ 'label' => 'three', 'val' => 10 ],
        [ 'label' => 'four', 'val' => 12 ],
        [ 'label' => 'five', 'val' => 15 ],
        [ 'label' => 'six', 'val' => 30 ]
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
            [ 12, 15, 10, 11, 16, 18, 12 ], [ 12, 10, 5, 13, 9, 17, 15 ]
        ]
    ]
];


echo json_encode( $data );