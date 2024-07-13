function main() {
    const args = process.argv.slice(2);

    if (args.length < 1) {
      console.error('Error: Not enough arguments. Please provide a base URL.');
      process.exit(1);
    }
  
    if (args.length > 1) {
      console.error('Error: Too many arguments. Please provide only one base URL.');
      process.exit(1);
    }

    const baseURL = args[0];
    console.log(`Starting the crawler at: ${baseURL}`);
  }

main()