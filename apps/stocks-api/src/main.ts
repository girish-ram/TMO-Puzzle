/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import { getChartData } from './chart-data';

const CatBoxMemory = require('@hapi/catbox-memory');

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost',
    cache: [
      {
        name: 'stock_cache',
        provider: {
          constructor: CatBoxMemory
        }
      }
    ]
  });

  server.method('getStock', getChartData, {
    cache: {
      cache: 'stock_cache',
      expiresIn: 200000,
      generateTimeout: 20000
    }
  });

  server.route({
    method: 'GET',
    path: '/api/getStock/{symbol}/{period}',
    handler: async (request, h) => {
      const { symbol, period } = request.params;
      return await server.methods.getStock(symbol, period);
    }
  });
}
