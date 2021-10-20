import gulp from 'gulp';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import path from 'path';

interface Options {
  workinDir: string;
  inputFiles: string;
  outputDir: string;
}
export default function createBuildStyle(
  { workinDir, inputFiles, outputDir }: Options = {
    workinDir: process.cwd(),
    inputFiles: './src/style/**/*.less',
    outputDir: 'style',
  }
) {
  return function buildStyle() {
    const src = path.join(workinDir, inputFiles);
    const output = path.join(workinDir, outputDir);
    return gulp
      .src(src)
      .pipe(less())
      .pipe(autoprefixer())
      .pipe(cleanCss())
      .pipe(gulp.dest(output));
  };
}
