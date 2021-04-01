import ora from 'ora';

class Spin {
    ora!: ora.Ora
    start(msg: string) {
      this.ora = ora(msg + '\n').start();

    }
    end() {
      this.ora.stop();
      this.ora.clear();
    }
}

export default new Spin();
