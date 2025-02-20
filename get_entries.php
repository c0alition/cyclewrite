<?php
function processDirectory($directory) {
    // Open the directory
    $dir = opendir($directory);

    // Iterate through files and subdirectories
    while (($file = readdir($dir)) !== false) {
        $filePath = $directory . DIRECTORY_SEPARATOR . $file;

        // Skip . and .. entries
        if ($file === '.' || $file === '..') {
            continue;
        }

        // If it's a directory, recursively process it
        if (is_dir($filePath)) {
            processDirectory($filePath);
        } elseif ($file === 'index.html') {
            // If it's the index.html file, process it
            processFile($filePath);
        }
    }

    // Close the directory
    closedir($dir);
}

function processFile($filePath) {
    // Load and parse the index.html file
    $doc = new DOMDocument();
    @$doc->loadHTML(file_get_contents($filePath));

    // Extract the title
    $title = $doc->getElementsByTagName('title')->item(0)->textContent;

    // Extract the meta description snippet
    $snippet = '';
    $metaTags = $doc->getElementsByTagName('meta');
    foreach ($metaTags as $metaTag) {
        if ($metaTag->getAttribute('id') === 'snippet') {
            $snippet = $metaTag->getAttribute('content');
            break;
        }
    }

    // Output the template with the extracted data
    echo '<div class="entry-thumbnail">';
    echo '  <a href="' . $filePath . '">';
    echo '    <div class="entry-thumbnail-header">';
    echo '      <h5>' . htmlspecialchars($title) . '</h5>';
    echo '    </div>';
    echo '    <div class="entry-thumbnail-content-container">';
    echo '      <div class="entry-thumbnail-photo"></div>';
    echo '      <div class="entry-thumbnail-snippet">';
    echo '        <p>' . htmlspecialchars($snippet) . '</p>';
    echo '      </div>';
    echo '    </div>';
    echo '  </a>';
    echo '</div>';
}

// Set the directory to the articles folder
$directory = '/articles';
processDirectory($directory);
?>
