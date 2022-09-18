import { IAllLaunchesInfo, ILaunchDataResponse, ILaunchesResponse, ISpaceXData } from "../types";

export const getLaunchDetails = (fetchedResult: ILaunchDataResponse[]) => {
  return fetchedResult.map((res, index: number) => {
    const launchData: ISpaceXData = {
      id: index + 1,
      flight_number: res.data.flight_number,
      mission_name: res.data.mission_name,
      launch_year: res.data.launch_year,
      launch_date_local: res.data.launch_date_local,
      details: res.data.details,
      launch_success: res.data.launch_success,
      rocket: {
        rocket_id: res.data.rocket.rocket_id,
        rocket_name: res.data.rocket.rocket_name,
        rocket_type: res.data.rocket.rocket_type
      },
      images: {
        mission_image: res.data.links.mission_patch_small,
        flickr_images: res.data.links.flickr_images[0]
      }
    };
    return launchData;
  });
};

export const getLaunchStatistics = (launches: ILaunchesResponse[]) => {
  const allLaunchesInfo: IAllLaunchesInfo = {
    launchYear: [],
    rocketName: [],
    rocketType: [],
    launchSuccess: [],
    launchSite: []
  };
  launches.map((launch) => {
    allLaunchesInfo.launchYear.push(launch.launch_year);
    allLaunchesInfo.rocketName.push(launch.rocket.rocket_name);
    allLaunchesInfo.rocketType.push(launch.rocket.rocket_type);
    allLaunchesInfo.launchSuccess.push(launch.launch_success);
    allLaunchesInfo.launchSite.push(launch.launch_site.site_name_long);
    return null;
  });
  //keep a tally of number of occurrances of a value in array with object key/value pairs
  // e.g [2006, 2007, 2008, 2008] => [{2006: 1}, {2007:1}, {2008: 2}]
  const statistics = Object.keys(allLaunchesInfo).map(infoType => {
    return allLaunchesInfo[infoType].reduce((acc: object, value: string) => {
      acc[value] ? acc[value]++ : (acc[value] = 1);
      return acc;
    }, {});
  });
  return statistics;
};
