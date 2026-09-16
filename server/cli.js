const { Command } = require('commander');
const { execSync } = require('child_process');

const program = new Command();

program
  .command('migration:run')
  .description('Runs all pending migrations')
  .action(() => {
    try {
      console.log('Running migrations...');
      execSync('typeorm migration:run', { stdio: 'inherit' });
      console.log('Migrations ran successfully!');
    } catch (error) {
      console.error('Error running migrations:', error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
