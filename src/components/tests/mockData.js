export const launches = [
  {
    id: 1,
    flight_number: 20,
    mission_name: "DSCOVR",
    launch_year: "2015",
    launch_date_local: "2015-02-11T19:03:00-04:00",
    details:
      "First launch under USAF's OSP 3 launch contract. First SpaceX launch to put a satellite to an orbit with an orbital altitude many times the distance to the Moon: Sun-Earth libration point L1. The first stage made a test flight descent to an over-ocean landing within 10 m (33 ft) of its intended target.",
    launch_success: true,
    rocket: {
      rocket_id: "falcon9",
      rocket_name: "Falcon 9",
      rocket_type: "v1.1"
    },
    images: {
      mission_image: "https://images2.imgbox.com/63/c5/0OIpD59z_o.png",
      flickr_images:
        "https://farm9.staticflickr.com/8619/16511407538_9a25c5d8c6_o.jpg"
    }
  },
  {
    id: 2,
    flight_number: 21,
    mission_name: "TEST2",
    launch_year: "2011",
    launch_date_local: "2015-02-11T19:03:00-04:00",
    details: "Testing Details.",
    launch_success: true,
    rocket: {
      rocket_id: "falcon12",
      rocket_name: "Falcon Q",
      rocket_type: "v1.3"
    },
    images: {
      mission_image: "https://images2.imgbox.com/20/10/sqPgZfej_o.png",
      flickr_images:
        "https://farm9.staticflickr.com/8749/16788442562_ed460c2d9e_o.jpg"
    }
  }
];
