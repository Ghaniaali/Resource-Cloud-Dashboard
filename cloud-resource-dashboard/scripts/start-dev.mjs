import { createConnection } from 'node:net';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let stopping = false;
const children = [];

function portIsInUse(port) {
  return Promise.all(['::1', '127.0.0.1'].map(host => new Promise(resolvePort => {
    const socket = createConnection({ host, port });
    socket.setTimeout(1000);
    socket.once('connect', () => {
      socket.destroy();
      resolvePort(true);
    });
    socket.once('timeout', () => {
      socket.destroy();
      resolvePort(false);
    });
    socket.once('error', () => resolvePort(false));
  }))).then(results => results.some(Boolean));
}

function startProcess(name, args) {
  const child = spawn(process.execPath, args, {
    cwd: projectRoot,
    stdio: 'inherit'
  });

  child.on('error', error => {
    console.error(`${name} failed to start:`, error);
    process.exitCode = 1;
    if (name === 'JSON Server') {
      stopChildren();
    }
  });

  child.on('exit', (code, signal) => {
    if (!stopping) {
      console.error(`${name} stopped${signal ? ` after ${signal}` : ` with exit code ${code}`}.`);
      process.exitCode = code || 1;
      if (name === 'JSON Server') {
        stopChildren();
      }
    }
  });

  children.push(child);
}

function stopChildren() {
  if (stopping) {
    return;
  }

  stopping = true;
  for (const child of children) {
    if (child.exitCode === null && child.signalCode === null) {
      child.kill();
    }
  }
}

if (await portIsInUse(4200)) {
  console.log('Port 4200 is already in use; using the existing server instead of starting another Angular instance.');
} else {
  startProcess('Angular', [
    resolve(projectRoot, 'node_modules/@angular/cli/bin/ng.js'),
    'serve'
  ]);
}

startProcess('JSON Server', [
  resolve(projectRoot, 'node_modules/json-server/lib/bin.js'),
  'db.json',
  '--port',
  '3000'
]);

process.on('SIGINT', stopChildren);
process.on('SIGTERM', stopChildren);
