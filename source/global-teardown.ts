import { $ } from "zx";

const globalTeardown = async () => {
  await $`docker kill yii2`;
};

export default globalTeardown;
