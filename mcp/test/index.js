// Lets `node --test mcp/test/` work: Node resolves the directory to this file,
// which loads every test file in the folder. `node --test "mcp/test/*.test.mjs"` also works.
import './tools.test.mjs';
import './e2e.test.mjs';
