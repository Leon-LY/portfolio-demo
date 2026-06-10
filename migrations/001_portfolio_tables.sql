-- Portfolio admin data (JSONB blob for all editable content)
CREATE TABLE IF NOT EXISTS portfolio_data (
  id          INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  data        JSONB NOT NULL DEFAULT '{}',
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio project images (files stored in uploads/, metadata in DB)
CREATE TABLE IF NOT EXISTS portfolio_images (
  id            SERIAL PRIMARY KEY,
  project_id    VARCHAR(64) NOT NULL,
  filename      VARCHAR(255) NOT NULL,
  original_name VARCHAR(255),
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_portfolio_images_project ON portfolio_images(project_id, sort_order);

-- Seed default portfolio data if table is empty
INSERT INTO portfolio_data (id, data)
VALUES (1, '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;
