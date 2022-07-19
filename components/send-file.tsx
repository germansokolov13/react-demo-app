import React, { useEffect } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { postingsListStore } from '../stores/postings-list';
import SendFileProcess from '../services/send-file-process';

registerPlugin(FilePondPluginFileValidateType);

export default function SendFile() {
  const loadLatest = postingsListStore((state) => state.loadLatest);
  let sendFileProcess;

  // Long list of params is dictated by FilePond 3rd party component
  const processFile = (fieldName, file, metadata, load, error, progress, abort) => {
    sendFileProcess = new SendFileProcess()
      .setOnProgress(progress)
      .setOnFail(error)
      .setOnFinish(() => {
        load();
        loadLatest();
      });
    sendFileProcess.commit(file);

    return {
      abort: () => {
        sendFileProcess.abort();
        abort();
      },
    };
  };

  useEffect(() => () => {
    if (sendFileProcess) {
      sendFileProcess.abort();
    }
  }, []);

  return (
    <div className="form">
      <FilePond
        allowMultiple={false}
        labelTapToUndo="Tap to close"
        server={{ process: processFile }}
        allowFileTypeValidation
        acceptedFileTypes={['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg']}
      />
    </div>
  );
}
