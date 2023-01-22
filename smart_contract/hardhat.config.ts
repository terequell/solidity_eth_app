import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/TE9Dri_v-R1qgI1sfqmG5wXercKqiiEa',
      accounts: ['73b25d02e21b73f382cf0017f834b95511e7a5c880b837b18a81771a88ebc43f']
    }
  }
};

export default config;
