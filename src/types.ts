export interface ILaunchesResponse {
  launch_year: string;
  launch_success: boolean;
  rocket: {
    rocket_name: string;
    rocket_type: string;
  }
  launch_site: {
    site_name_long: string;
  }
}

export interface IAllLaunchesInfo {
    launchYear: string[],
    rocketName: string[],
    rocketType: string[],
    launchSuccess: boolean[],
    launchSite: string[]
}

export interface ILaunchDataResponse {
  data: {
    flight_number: number;
    mission_name: string;
    launch_year: string;
    launch_date_local: string;
    details: string;
    launch_success: string;
    rocket: {
      rocket_id: string;
      rocket_name: string;
      rocket_type: string;
    },
    links: {
      mission_patch_small: string;
      flickr_images: string[];
    }
  }
}

export interface ISpaceXData {
  id: number;
  flight_number: number;
  mission_name: string;
  launch_year: string;
  launch_date_local: string;
  details: string;
  launch_success: string;
  rocket: IRocketData;
  images: IImagesData;
}

interface IRocketData {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
}

interface IImagesData {
  mission_image: string;
  flickr_images: string;
}