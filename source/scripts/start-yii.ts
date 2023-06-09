import { $ } from "zx";

(async () => {
  await $`docker run --rm -p 8888:80 --name yii2 -v \`pwd\`/yii-app:/app schmunk42/yii2-app-basic`;
})();
