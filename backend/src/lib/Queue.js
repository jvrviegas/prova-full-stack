import Bee from 'bee-queue';
import ReminderMail from '../app/jobs/ReminderMail';
import RedisConfig from '../config/redis';

const jobs = [ReminderMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: RedisConfig,
          delayedDebounce: 1000,
          activateDelayedJobs: true,
        }),
        handle,
      };
    });
  }

  add(queue, job, date) {
    return this.queues[queue].bee
      .createJob(job)
      .delayUntil(Date.parse(date))
      .save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
