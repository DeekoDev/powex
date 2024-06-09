import { Configuration, Stats } from "webpack";
import { webpackAsync } from "../../utils/webpack-async";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import autoprefixer from "autoprefixer";

interface GenerateOptionsBundle
  extends Pick<Configuration, "entry" | "output" | "target" | "plugins"> {}

export const generateBundle = (
  options: GenerateOptionsBundle
): Promise<Stats> => {
  const stats = webpackAsync({
    mode: "development",
    entry: options.entry,
    output: options.output,
    target: options.target,
    plugins: [new MiniCssExtractPlugin(), ...(options?.plugins || [])],
    module: {
      rules: [
        {
          test: /.[tj]sx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-proposal-class-properties"],
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [autoprefixer],
                },
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.jpe?g|png$/,
          exclude: /node_modules/,
          type: "asset/resource",
        },
      ],
    },
  });

  return stats;
};
