export default ({ env }) => ({
	"postgis": {
		enabled:  true,
	},
  "string-array": {
    enabled: true,
    resolve: "./src/plugins/string-array",
  }
});
