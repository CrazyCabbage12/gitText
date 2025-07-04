
const env = import.meta.env.MODE || 'development';
const EnvConfig = {
    development: {
        baseAPI: 'http://localhost:8080',
        MockAPI: 'http://localhost:8080'
    },
    Test: {
        baseAPI: 'http://localhost:8080',
        MockAPI: 'http://localhost:8080'
    },
    prod: {
        baseAPI: 'http://localhost:8080',
        MockAPI: 'http://localhost:8080'
    }
}
export default {
    ...EnvConfig[env],
    mock:false
};