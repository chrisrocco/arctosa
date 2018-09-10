# Arctosa | eBay Analytics Tool

### Man Page
##### Name
```
arctosa - query the eBay marketplace for completed sales
```
##### Options
```
--market filePath                     Location of the market definition JSON file used to query eBay
--environment filePath                Location of the .env file containing eBay and PubSub credentials
[--outputDir] folderPath              Location to write JSON log files as data comes in
[--maxRecursionDepth] number          Set the maximum pagination depth. This is how many times Arctosa will follow links
[--itemsPerPage] number               Set the number of items to request per eBay API call
```
##### Description
Arctosa is a command line tool used to query eBay sales records and publish them to a stream. Downstream services can consume the information that Arctosa publishes to generate projections and reports. This utility uses a market definition to capture the seller's intented data set, and item requests to represent units of scraping work to be done.
