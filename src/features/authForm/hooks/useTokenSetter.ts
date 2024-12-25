import toast from "react-hot-toast";

import { CLOUD_STORAGE } from "@/shared/lib/constants";
import { isDeveloment } from "@/shared/lib/isDevelopment";

interface Props {
  accessToken: string;
  refreshToken: string;
}

export const useTokenSetter = () => {
  const setter = ({ accessToken, refreshToken }: Props) => {
    if (!isDeveloment()) {
      const isForTesters =
        window.Telegram.WebApp.initDataUnsafe?.start_param?.includes("env");

      if (isForTesters) {
        window.Telegram.WebApp.CloudStorage.setItem(
          CLOUD_STORAGE.TOKEN,
          accessToken,
          (err) => {
            if (err) {
              toast.error("Error setting AT");
            }
          },
        );
      }

      // not only for testers, it maybe will useful in future
      window.Telegram.WebApp.CloudStorage.setItem(
        CLOUD_STORAGE.REFRESH_TOKEN,
        refreshToken,
        (err) => {
          if (err) {
            toast.error("Error setting RT");
          }
        },
      );
    }
  };

  return setter;
};
