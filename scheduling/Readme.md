# scheduling

Contains a set of scripts that run based on different cron schedules.
Since Next.js is theoretically _serveless_, we cannot schedule jobs within the app itself.

The solution here is to define separate railway jobs that run on a cron schdule, and either
modify the db directly or call the api endpoint associated with the job.

Each job is definition is located within its own subfolder and contains a `railway.toml`
configuration file that defines the schedule and command to run.