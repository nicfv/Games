module.exports = {
    module: {
        rules: [
            { test: /.ts$/, use: 'ts-loader' },
        ],
    },
    resolve: {
        extensions: ['.ts', '...'],
    },
};