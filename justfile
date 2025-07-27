# Install dependencies
install:
    npm install

# Generate static website
deploy:
    npm run build

# Open local blog in browser
open:
    chromium localhost:5173

# Check types
check:
    tsc --noEmit

# Serve local website with live updates
serve:
    npm run dev
