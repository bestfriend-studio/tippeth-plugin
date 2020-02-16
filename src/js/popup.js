import WalletConnect from '@walletconnect/browser';
import WalletConnectQRCodeModal from '@walletconnect/qrcode-modal';
import WalletConnectSubprovider from '@walletconnect/web3-subprovider';

// Update the relevant fields with the new data.
const setDOMInfo = info => {
  if (info.address) {
    const subprovider = new WalletConnectSubprovider({
      bridge: 'https://bridge.walletconnect.org'
    });

    const getAccount = async () => {
      try {
        const { accounts } = await subprovider.getWalletConnector();

        document.getElementById('to').textContent = `from: ${accounts[0]}`;
        document.getElementById('send1').onclick = e => {
          e.preventDefault;
          console.log(`sending 1 to ${accounts[0]}`);
          const tx = {
            // from: acc.toString();, // Required, change me
            from: accounts[0],
            to: info.address, // Required (for non contract deployments)
            data: '0x', // Required
            amount: '0x00'
          };

          // Send transaction
          walletConnector
            .sendTransaction(tx)
            .then(result => {
              // Returns transaction id (hash)
              console.log(result);
            })
            .catch(error => {
              // Error returned when rejected
              console.error(error);
            });
        };

        document.getElementById('send3').onclick = e => {
          e.preventDefault;
          console.log(`sending 3 to ${accounts[0]}`);
          const tx = {
            // from: acc.toString();, // Required, change me
            from: accounts[0],
            to: info.address, // Required (for non contract deployments)
            data: '0x', // Required
            amount: '0x00'
          };

          // Send transaction
          walletConnector
            .sendTransaction(tx)
            .then(result => {
              // Returns transaction id (hash)
              console.log(result);
            })
            .catch(error => {
              // Error returned when rejected
              console.error(error);
            });
        };

        document.getElementById('send5').onclick = e => {
          e.preventDefault;
          console.log(`sending 5 to ${accounts[0]}`);
          const tx = {
            // from: acc.toString();, // Required, change me
            from: accounts[0],
            to: info.address, // Required (for non contract deployments)
            data: '0x', // Required
            amount: '0x00'
          };

          // Send transaction
          walletConnector
            .sendTransaction(tx)
            .then(result => {
              // Returns transaction id (hash)
              console.log(result);
            })
            .catch(error => {
              // Error returned when rejected
              console.error(error);
            });
        };

        return;
      } catch (e) {
        console.log('We have the error', e);
      }
    };

    const account = getAccount();

    document.getElementById('from').textContent = `to: ${info.address}`;

    // async () => {
    //   const prom = getAccount();
    //   const account = await prom;
    //   document.getElementById('to').textContent = `from: ${account}`;
    // };

    // Create a walletConnector
    const walletConnector = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org' // Required
    });

    // Check if connection is already established
    if (!walletConnector.connected) {
      // create new session
      walletConnector.createSession().then(() => {
        // get uri for QR Code modal
        const uri = walletConnector.uri;
        // display QR Code modal
        WalletConnectQRCodeModal.open(uri, () => {
          console.log('QR Code Modal closed');
        });
      });
    }

    // Subscribe to connection events
    walletConnector.on('connect', (error, payload) => {
      if (error) {
        throw error;
      }

      // Close QR Code Modal
      WalletConnectQRCodeModal.close();

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    walletConnector.on('session_update', (error, payload) => {
      if (error) {
        throw error;
      }
      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    walletConnector.on('disconnect', (error, payload) => {
      if (error) {
        throw error;
      }

      // Delete walletConnector
    });

    // const send = (e, amount, acc) => {
    //   e.preventDefault;
    //   acc
    //     .then(account => {
    //       console.log(`sending ${amount} to ${account}`);

    //       // Draft transaction
    //       const tx = {
    //         // from: acc.toString();, // Required, change me
    //         from: '0xe13A97Fb9d2DD1CEb350cb1Dc8d7bBCE6F20A777',
    //         to: info.address, // Required (for non contract deployments)
    //         data: '0x' // Required
    //       };

    //       // Send transaction
    //       walletConnector
    //         .sendTransaction(tx)
    //         .then(result => {
    //           // Returns transaction id (hash)
    //           console.log(result);
    //         })
    //         .catch(error => {
    //           // Error returned when rejected
    //           console.error(error);
    //         });
    //     })
    //     .catch(error => {
    //       // Error returned when rejected
    //       console.error(error);
    //     });

    //   document.getElementById('send1').onclick = e => {
    //     e.preventDefault;
    //     send(e, 1, account);
    //   };
    //   document.getElementById('send3').onclick = e => {
    //     e.preventDefault;
    //     send(e, 3, account);
    //   };
    //   document.getElementById('send5').onclick = e => {
    //     e.preventDefault;
    //     send(e, 1, account);
    //   };
    // };
  } else {
    document.getElementById('address').textContent = 'no address set';
  }
};

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    tabs => {
      // ...and send a request for the DOM info...
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: 'popup', subject: 'DOMInfo' },
        // ...also specifying a callback to be called
        //    from the receiving end (content script).
        setDOMInfo
      );
    }
  );
});
