import log from 'npmlog';

const head = 'em-cli';

log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
log.heading = head;
log.headingStyle = {
  fg: 'red',
  bg: 'black',
};

log.addLevel('success', 2000, { fg: 'green', bold: true });

export default log;
