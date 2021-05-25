import ora from 'ora';

// spinner.fail() // close -- error icon 
// spinner.succeed() // close -- success icon 
class Spin {
    ora!: ora.Ora
    start(msg: string) {
      this.ora = ora(msg + '\n').start();
      return this.ora;
    }
}

export default new Spin();
