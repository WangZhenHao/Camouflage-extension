const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.tsx",
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            compilerOptions: { noEmit: false },
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                exclude: /node_modules/,
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, "./public"),
                    to: path.join(__dirname, "./dist"),
                    globOptions: {
                        ignore: ["**/template.*"],
                    },
                },
            ],
        }),
        ...getHtmlPlugins(["index"]),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.join(__dirname, "./dist"),
        filename: path.posix.join("js/[name].js"),
        publicPath: "./",
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "React extension",
                filename: `${chunk}.html`,
                chunks: [chunk],
                template: path.join(__dirname, "./public/template.html"),
            })
    );
}
